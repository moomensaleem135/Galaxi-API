import { IweeklyUsers } from '@/interfaces/userBalance.interface';
import { getAllRequest } from '@/interfaces/users.interface';
import DB from '@databases';
import HttpException from '@exceptions/HttpException';
import { StripePayment } from '@interfaces/stripePayment.interface';
import { getRefreshUrl, getReturnUrl, isEmpty } from '@utils/util';
import sequelize, { Op } from 'sequelize';
import { weekNumber } from 'weeknumber';
import { Stripe } from 'stripe';
import UserBalanceService from './userBalanceAndMemberShip.service';
import WithdrawBankTransferService from './withdrawBankTransfer.service';

class StripePaymentService {
  private CENT: number;
  public stripe: Stripe;
  private stripePayment = DB.StripePayment;
  private daysInWeek = 7;
  private weeks = 5;
  private sixWeekAgo = new Date(new Date().setDate(new Date().getDate() - this.daysInWeek * this.weeks));
  private userBalanceService: UserBalanceService;
  private withdrawBankTransferService: WithdrawBankTransferService;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
      typescript: true,
    });
    this.CENT = 100;
    this.userBalanceService = new UserBalanceService();
    this.withdrawBankTransferService = new WithdrawBankTransferService();
  }

  public getBalance = async () => {
    try {
      const balance = await this.stripe.balance.retrieve();
      return balance;
    } catch (error) {
      throw new Error(error);
    }
  };

  public async createStripePayment(StripePaymentData: StripePayment): Promise<StripePayment> {
    try {
      if (isEmpty(StripePaymentData)) throw new HttpException(400, 'Invalid Request Data');
      const createStripePaymentData: StripePayment = await this.stripePayment.create({ ...StripePaymentData });
      return createStripePaymentData;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAllStripePayment(req: getAllRequest): Promise<StripePayment[]> {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Invalid Request Data');
      const { size, sortField, sortType, offset } = req;
      const stripePaymentData: StripePayment[] = await this.stripePayment.findAll({
        offset,
        limit: size,
        order: [[sequelize.col(`${sortField}`), sortType]],
      });
      return stripePaymentData;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAllStripePaymentCount(): Promise<number> {
    try {
      const count = await this.stripePayment.count();
      return count;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getWeeklyStripePayment() {
    try {
      const weeklyPayment = await this.stripePayment.count({
        attributes: [
          [sequelize.fn('date_part', 'week', sequelize.col('created_at')), 'weekN'],
          [sequelize.literal(`min(created_at)`), 'min'],
        ],
        where: {
          createdAt: { [Op.between]: [this.sixWeekAgo, Date.now() as unknown as Date] },
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

  public async getUserStripePaymentsHistory(googleId: number) {
    try {
      const userPayments = await this.stripePayment.findAll({
        attributes: ['amount', 'created_at'],
        where: { googleId },
      });
      return userPayments;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async stripeCheckout(req: any): Promise<any> {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Invalid Request Data');
      const { googleId, token, amount, name, phone, membershipId } = req;
      const galaxiChargesPerInvest = (1.5 * amount) / 100;
      const amountInvest = amount - galaxiChargesPerInvest;
      const customer = await this.stripe.customers.create({
        name,
        email: token.email,
        source: token.id ? token.id : token.tokenId,
        phone,
      });
      const charges = await this.stripe.charges.create({
        amount: membershipId && membershipId === 1 ? amount * this.CENT : amountInvest * this.CENT,
        currency: 'USD',
        customer: customer.id,
      });

      if (charges.status) {
        const balanceTransaction = await this.stripe.balanceTransactions.retrieve(charges.balance_transaction as string);
        const netAmount = balanceTransaction.net / this.CENT;
        const fee = balanceTransaction.fee / this.CENT;
        const stripePyament = await this.createStripePayment({
          googleId,
          amount,
          stripeProcessingFees: fee,
          netAmount,
          balanceTransactionId: charges.balance_transaction as string,
          currency: charges.currency,
          receiptUrl: charges.receipt_url,
          galaxiServiceCharges: (membershipId && membershipId) === 1 ?  galaxiChargesPerInvest : 0
        });
        await this.userBalanceService.updateSettledCash({
          googleId,
          amount: stripePyament.netAmount,
        });
        await this.userBalanceService.updateMembershipId(googleId, membershipId);
        const resp = {
          id: stripePyament.id,
          googleId: stripePyament.googleId,
          amount: amount,
          stripeProcessingFees: stripePyament.stripeProcessingFees,
          netAmount: stripePyament.netAmount,
          currency: stripePyament.currency,
          balanceTransactionId: stripePyament.balanceTransactionId,
          receiptUrl: stripePyament.receiptUrl,
          createdAt: stripePyament.createdAt,
          galaxiCharges: (membershipId && membershipId) === 1 ? 0 : galaxiChargesPerInvest,
        };
        return resp;
      } else {
        throw new HttpException(400, 'Unable To Create transaction and Charges');
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  public checkoutMemberShipWithToken = async (req: any) => {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Invalid Request Data');
      const { googleId, membershipId, token } = req;
      if (!token || !membershipId) throw new HttpException(400, 'Token and Membership id required');
      const membershipData = await DB.Memberships.findOne({
        where: {
          id: {
            [Op.eq]: membershipId,
          },
        },
      });
      if (!membershipData.title) {
        throw new HttpException(400, 'Invalid Membership Id');
      } else {
        const stripePyament = await this.stripeCheckout(req);
        if (stripePyament.id) {
          await this.userBalanceService.updateMembershipId(googleId, membershipId);
          return stripePyament;
        } else {
          throw new HttpException(400, 'Unable To Create Stripe Payment');
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  public bankTransfer = async (req: any) => {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Invalid Request Data');
      const { amount, googleId } = req;
      await this.userBalanceService.getBlancestatus(googleId);
      const bkAccId = await this.userBalanceService.getAccountId(googleId);
      const transfer = await this.stripe.transfers.create({
        amount: amount * this.CENT,
        currency: 'usd',
        destination: bkAccId,
      });
      const balanceTransaction = await this.stripe.balanceTransactions.retrieve(transfer.balance_transaction as string);
      const data = await this.withdrawBankTransferService.createWithdrawBankTransfer({
        googleId,
        transferId: transfer.id,
        balanceTransactionId: transfer.balance_transaction as string,
        amount: -(balanceTransaction.amount / this.CENT),
        bankTransferFee: -(balanceTransaction.fee / this.CENT),
        netAmount: -(balanceTransaction.net / this.CENT),
        currency: balanceTransaction.currency,
        destinationId: transfer.destination as string,
        destinationPaymentId: transfer.destination_payment as string,
      });

      await this.userBalanceService.withdrawSettledCash({
        googleId,
        amount: transfer.amount / this.CENT,
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  public verifyAccountNumber = async (req: any) => {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Invalid Request Data');
      const { googleId } = req;
      const account = await this.stripe.accounts.create({
        type: 'express',
      });
      const refresh_url = getRefreshUrl();
      const return_url = getReturnUrl();
      const accountLink = await this.stripe.accountLinks.create({
        account: account.id,
        refresh_url,
        return_url,
        type: 'account_onboarding',
      });
      await this.userBalanceService.updateAccountId(googleId, account.id);
      return { url: accountLink.url };
    } catch (error) {
      throw new Error(error);
    }
  };

  public createCheckoutSession = async () => {
    try {
      const success_url = getRefreshUrl();
      const cancel_url = getReturnUrl();
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Galaxi',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url,
        cancel_url,
      });
      return session.url;
    } catch (error) {
      throw new Error(error);
    }
  };

  public achTransfer = async (req: any) => {
    try {
      const source = await this.stripe.sources.create({
        type: 'ach_credit_transfer',
        currency: 'usd',
        owner: { email: req.email || 'jenny.rosen@example.com' },
      });
      return source;
    } catch (error) {
      throw new Error(error);
    }
  };

  public updateBkAccVerified = async (req: any) => {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Invalid Request Data');
      const { googleId } = req;
      const bkAccVerified = await this.userBalanceService.updateBkAccVerified(googleId);
      return bkAccVerified;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default StripePaymentService;
