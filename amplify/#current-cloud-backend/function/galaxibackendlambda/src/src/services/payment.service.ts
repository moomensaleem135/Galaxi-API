import { IweeklyUsers } from '@/interfaces/userBalance.interface';
import { getAllRequest, User } from '@/interfaces/users.interface';
import DB from '@databases';
import HttpException from '@exceptions/HttpException';
import { Payment } from '@interfaces/payment.interface';
import { isEmpty } from '@utils/util';
import sequelize, { Op } from 'sequelize';
import { weekNumber } from 'weeknumber';
import { v4 as uuidv4 } from 'uuid';
import { Checkout } from 'checkout-sdk-node';

import UserBalanceService from './userBalanceAndMemberShip.service';

class PaymentService {
  private payment = DB.Payment;
  private daysInWeek = 7;
  private weeks = 5;
  private sixWeekAgo = new Date(new Date().setDate(new Date().getDate() - this.daysInWeek * this.weeks));
  private userBalanceService = new UserBalanceService();
  private CENT = 100;
  public cko: Checkout;

  constructor() {
    this.cko = new Checkout(process.env.CHEKOUT_SECRET_KEY);
  }

  public async createPayment(paymentData: Payment): Promise<Payment> {
    try {
      if (isEmpty(paymentData)) throw new HttpException(400, "You're not PaymentData");
      const createPaymentData: Payment = await this.payment.create({ ...paymentData });
      return createPaymentData;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAllPayment(req: getAllRequest): Promise<Payment[]> {
    const { size, sortField, sortType, offset } = req;
    try {
      const paymentData: Payment[] = await this.payment.findAll({
        offset,
        limit: size,
        order: [[sequelize.col(`${sortField}`), sortType]],
      });
      return paymentData;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAllPaymentCount(): Promise<number> {
    try {
      const count = await this.payment.count();
      return count;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getWeeklyPayment() {
    try {
      const weeklyPayment = await this.payment.count({
        attributes: [
          [sequelize.fn('date_part', 'week', sequelize.col('processed_on')), 'weekN'],
          [sequelize.literal(`min(processed_on)`), 'min'],
        ],
        where: {
          processed_on: { [Op.between]: [this.sixWeekAgo, Date.now() as unknown as Date] },
        },
        group: ['weekN'],
      });
      const weeklyPaymentDto = weeklyPayment as unknown as IweeklyUsers[];

      const startWeek = weekNumber(this.sixWeekAgo);
      const endWeek = startWeek + this.weeks;

      for (let i = startWeek; i <= endWeek; i++) {
        const filteredItem = weeklyPaymentDto.filter(item => item.weekN == i);

        if (filteredItem.length == 0) {
          weeklyPaymentDto.push({ weekN: i, min: Date.now() as unknown as Date, count: 0 });
        }
      }
      weeklyPaymentDto.sort((firstItem, secondItem) => firstItem.weekN - secondItem.weekN);
      return weeklyPaymentDto;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getUserPaymentsHistory(googleId: number) {
    try {
      const userPayments = await this.payment.findAll({
        attributes: ['amount', 'processed_on'],
        where: { googleId },
      });
      return userPayments;
    } catch (err) {
      throw new Error(err);
    }
  }

  public paymentCheckout = async (req: any) => {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Invalid Payment Data');
      const { token, email, googleId, givenName, phoneNum, amount, description, membershipId } = req;
      const galaxiChargesPerInvest = (1.5 * parseInt(amount)) / 100;
      const amountInvest = parseInt(amount) - galaxiChargesPerInvest;
      const country_code = phoneNum.slice(0, 3);
      const number = phoneNum.slice(3);
      const parsedAmount = membershipId && membershipId === 1 ? parseInt(amount) * this.CENT : amountInvest * this.CENT;
      const dt = {
        source: {
          token: token,
          phone: {
            country_code,
            number,
          },
        },
        currency: 'USD',
        amount: parsedAmount,
        payment_type: 'Regular',
        reference: uuidv4(),
        description,
        customer: {
          email,
          name: givenName,
        },
      };
      const payment = (await this.cko.payments.request(dt)) as any;
      if (payment.approved) {
        let amountInUSD = parseInt(payment.amount as string);
        amountInUSD = amountInUSD / this.CENT;
        const paymentObj: Payment = {
          googleId,
          action_id: payment?.action_id as string,
          amount: amountInUSD.toString(),
          currency: payment.currency as string,
          auth_code: payment.auth_code as string,
          paymentID: payment.id as string,
          processed_on: payment.processed_on as string,
          acquirer_transaction_id: (payment.processing as Record<string, string>).acquirer_transaction_id,
          retrieval_reference_number: (payment.processing as Record<string, string>).retrieval_reference_number,
          reference: payment.reference as string,
        };
        const paymentServiceData = await this.createPayment(paymentObj);
        if (paymentServiceData.id) {
          await this.userBalanceService.updateSettledCash({
            googleId: paymentServiceData.googleId,
            amount: parseInt(paymentServiceData.amount),
          });
          // await this.userBalanceService.updateMembershipId(googleId, membershipId);
          if (membershipId) {
            await this.userBalanceService.updateMembershipData(googleId, membershipId);
          }
        }
        return {
          id: paymentServiceData.id,
          googleId: paymentServiceData.googleId,
          action_id: paymentServiceData.action_id,
          amount,
          amountInvested: paymentServiceData.amount,
          auth_code: paymentServiceData.auth_code,
          currency: paymentServiceData.currency,
          paymentID: paymentServiceData.paymentID,
          processed_on: paymentServiceData.processed_on,
          acquirer_transaction_id: paymentServiceData.acquirer_transaction_id,
          retrieval_reference_number: paymentServiceData.retrieval_reference_number,
          reference: paymentServiceData.reference,
          galaxiCharges: membershipId && membershipId === 1 ? 0 : galaxiChargesPerInvest,
        };
      } else {
        throw new HttpException(400, 'Payment Not Approved Wrong Credentials');
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  public removeCheckoutMemberShip = async (req: any) => {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Invalid Data');
      const { googleId, membershipId, isExpired } = req;
      const user: User = await this.userBalanceService.updateMembershipData(googleId, membershipId, isExpired);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  //unused
  public paymentCheckoutMembership = async (req: any) => {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Invalid Membership Data');
      const { token, email, googleId, givenName, phoneNum, amount, description, membershipId } = req;
      if (membershipId !== 1) {
        const country_code = phoneNum.slice(0, 3);
        const number = phoneNum.slice(3);
        let parsedAmount = parseInt(amount);
        parsedAmount = parsedAmount * this.CENT;
        try {
          const dt = {
            source: {
              token: token,
              phone: {
                country_code,
                number,
              },
            },
            currency: 'USD',
            amount: parsedAmount,
            payment_type: 'Regular',
            reference: uuidv4(),
            description,
            customer: {
              email,
              name: givenName,
            },
          };
          const payment = (await this.cko.payments.request(dt)) as any;
          console.log('payment', payment);
          if (payment.approved) {
            await this.userBalanceService.updateMembershipId(googleId, membershipId);
            return {};
          } else {
            throw new HttpException(400, 'Payment Not Approved');
          }
        } catch (err) {
          console.log('Error in Creating Transaction With Checkout ', err);
          throw new HttpException(400, 'Error in Creating Transaction With Checkout');
        }
      } else {
        await this.userBalanceService.updateMembershipId(googleId, membershipId);
        return {};
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  public getDetails = async (req: any) => {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Id is Required to get payment detail');
      const payment = await this.cko.payments.get(req.id);
      return payment;
    } catch (error) {
      throw new Error(error);
    }
  };

  public getActions = async (req: any) => {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Id is Required to get payment detail');
      const payment = await this.cko.payments.getActions(req.id);
      return payment;
    } catch (error) {
      throw new Error(error);
    }
  };

  public capturePayment = async (req: any) => {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Invalid Request Data Id, Amount and reference is required');
      const result = await this.cko.payments.capture(req.id, {
        amount: req.amount,
        reference: req.refernce,
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  public refundPayment = async (req: any) => {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Invalid Request Data Id, Amount and reference is required');
      const result = await this.cko.payments.refund(req.id, {
        amount: req.amount,
        reference: req.refernce,
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default PaymentService;
