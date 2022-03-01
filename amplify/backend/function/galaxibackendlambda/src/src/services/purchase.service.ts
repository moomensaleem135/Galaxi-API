import { IweeklyUsers } from '@/interfaces/userBalance.interface';
import { getAllRequest } from '@/interfaces/users.interface';
import DB from '@databases';
import { Purchase } from '@interfaces/purchases.interface';
import sequelize, { Op } from 'sequelize';
import { weekNumber } from 'weeknumber';

class PurchaseService {
  private purchases = DB.Purchases;
  private daysInWeek = 7;
  private weeks = 5;
  private sixWeekAgo = new Date(new Date().setDate(new Date().getDate() - this.daysInWeek * this.weeks));

  public async getAllPurchase(req: getAllRequest): Promise<Purchase[]> {
    const { size, sortField, sortType, offset } = req;
    try {
      const purchasesData: Purchase[] = await this.purchases.findAll({
        offset,
        limit: size,
        order: [[sequelize.col(`${sortField}`), sortType]],
      });
      return purchasesData;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAllPurchaseCount(): Promise<number> {
    try {
      const count = await this.purchases.count();
      return count;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getWeeklyPurchase() {
    try {
      const weeklyPurchase = await this.purchases.count({
        attributes: [
          [sequelize.fn('date_part', 'week', sequelize.col('date_time')), 'weekN'],
          [sequelize.fn('min', sequelize.col('date_time')), 'min'],
          // [sequelize.fn('sum', sequelize.col('purchase_ammount')), 'sum'],
        ],
        where: {
          dateTime: { [Op.between]: [this.sixWeekAgo, Date.now() as unknown as Date] },
        },
        group: ['weekN'],
      });
      const weeklyPurchasedDto = weeklyPurchase as unknown as IweeklyUsers[];

      const startWeek = weekNumber(this.sixWeekAgo);
      const endWeek = startWeek + this.weeks;

      for (let i = startWeek; i <= endWeek; i++) {
        const filteredItem = weeklyPurchasedDto.filter(item => item.weekN == i);

        if (filteredItem.length == 0) {
          weeklyPurchasedDto.push({ weekN: i, min: Date.now() as unknown as Date, count: 0 });
        }
      }
      weeklyPurchasedDto.sort((firstItem, secondItem) => firstItem.weekN - secondItem.weekN);
      return weeklyPurchasedDto;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default PurchaseService;
