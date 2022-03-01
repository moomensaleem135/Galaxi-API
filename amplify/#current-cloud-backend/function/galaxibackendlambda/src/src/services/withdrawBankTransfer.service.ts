import { IweeklyUsers } from '@/interfaces/userBalance.interface';
import { getAllRequest } from '@/interfaces/users.interface';
import DB from '@databases';
import HttpException from '@exceptions/HttpException';
import { bankTransferstatus, IbankTransferstatus, WithdrawBankTransfer } from '@interfaces/withdrawBankTransfer.interface';
import { isEmpty } from '@utils/util';
import sequelize, { Op } from 'sequelize';
import Stripe from 'stripe';
import { weekNumber } from 'weeknumber';

class WithdrawBankTransferService {
  private withdrawBankTransfer = DB.WithdrawBankTransfer;
  public stripe: Stripe;
  private daysInWeek = 7;
  private weeks = 5;
  private sixWeekAgo = new Date(new Date().setDate(new Date().getDate() - this.daysInWeek * this.weeks));

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
      typescript: true,
    });
  }

  public async createWithdrawBankTransfer(WithdrawBankTransferData: WithdrawBankTransfer): Promise<WithdrawBankTransfer> {
    console.log('WithdrawBankTransferData', WithdrawBankTransferData);

    if (isEmpty(WithdrawBankTransferData)) throw new HttpException(400, "You're not WithdrawBankTransferData");

    const withdrawBankTransferData = await this.withdrawBankTransfer.create({ ...WithdrawBankTransferData });
    return withdrawBankTransferData;
  }

  public async updatestatus(googleId: string): Promise<WithdrawBankTransfer[]> {
    if (isEmpty(googleId)) throw new HttpException(400, "You're not googleId");
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const updatestatus = await this.withdrawBankTransfer.findAll({
      where: { 
        googleId, 
        status: bankTransferstatus.PENDING,
        [Op.and]: [
          sequelize.where(sequelize.fn('date', sequelize.col('updated_at')), '!=', currentDate),
        ]
      },
    });

    updatestatus.map(async (value, index) => {
      const balanceTransaction = await this.stripe.balanceTransactions.retrieve(value.balanceTransactionId as string);
      value.updatedAt = Date.now() as unknown as string
      if (balanceTransaction.status == 'available') {
        value.status = bankTransferstatus.DONE;
        await value.save();
      }
    });

    return updatestatus;
  }

  // public async getAllStripePayment(req: getAllRequest): Promise<StripePayment[]> {
  //   const { size, sortField, sortType, offset } = req;

  //   try {
  //     const stripePaymentData: StripePayment[] = await this.stripePayment.findAll({
  //       offset,
  //       limit: size,
  //       order: [[sequelize.col(`${sortField}`), sortType]],
  //     });
  //     return stripePaymentData;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // // public async getAllStripePaymentCount(): Promise<number> {
  //   try {
  //     const count = await this.stripePayment.count();
  //     return count;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // public async getWeeklyStripePayment() {
  //   try {
  //     const weeklyPayment = await this.stripePayment.count({
  //       attributes: [
  //         [sequelize.fn('date_part', 'week', sequelize.col('created_at')), 'weekN'],
  //         [sequelize.literal(`min(created_at)`), 'min'],
  //       ],
  //       where: {
  //        createdAt : { [Op.between]: [this.sixWeekAgo, Date.now() as unknown as Date] },
  //       },
  //       group: ['weekN'],
  //     });
  //     const weeklyPaymentDto = weeklyPayment as unknown as IweeklyUsers[];

  //     const startWeek = weekNumber(this.sixWeekAgo);
  //     const endWeek = startWeek + this.weeks;

  //     for (let i = startWeek; i <= endWeek; i++) {
  //       const filteredItem = weeklyPaymentDto.filter(item => item.weekN == i);

  //       if (filteredItem.length == 0) {
  //         weeklyPaymentDto.push({ weekN: i, min: Date.now() as unknown as Date, count: 0 });
  //       }
  //     }
  //     weeklyPaymentDto.sort((firstItem, secondItem) => firstItem.weekN - secondItem.weekN);
  //     return weeklyPaymentDto;
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }
}

export default WithdrawBankTransferService;
