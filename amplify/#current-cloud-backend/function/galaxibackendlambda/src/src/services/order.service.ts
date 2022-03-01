import DB from '@databases';
import { AxiosResponse } from 'axios';
import { Orders } from '@interfaces/orders.interface';
import { getAllRequest } from '@/interfaces/users.interface';
import sequelize, { Op } from 'sequelize';
import { weekNumber } from 'weeknumber';
import { IweeklyUsers } from '@/interfaces/userBalance.interface';

class OrderService {
  public ibkrServer = DB.IbkrServerModel;
  private purchases = DB.Purchases;
  public response: AxiosResponse<any>;
  private order = DB.Orders;
  private daysInWeek = 7;
  private weeks = 5;
  private sixWeekAgo = new Date(new Date().setDate(new Date().getDate() - this.daysInWeek * this.weeks));

  public async getAllOrders(req: getAllRequest): Promise<Orders[]> {
    const { size, sortField, sortType, offset } = req;
    try {
      const ordersData: Orders[] = await this.order.findAll({
        offset,
        limit: size,
        order: [[sequelize.col(`${sortField}`), sortType]],
      });
      return ordersData;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAllOrdersCount(): Promise<number> {
    try {
      const count = await this.order.count();
      return count;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getWeeklyOrders() {
    try {
      const weeklyOrders = await this.order.count({
        attributes: [
          [sequelize.fn('date_part', 'week', sequelize.col('date_time')), 'weekN'],
          [sequelize.literal(`min(date_time)`), 'min'],
        ],
        where: {
          dateTime: { [Op.between]: [this.sixWeekAgo, Date.now() as unknown as Date] },
        },
        group: ['weekN'],
      });
      const weeklyOrdersDto = weeklyOrders as unknown as IweeklyUsers[];

      const startWeek = weekNumber(this.sixWeekAgo);
      const endWeek = startWeek + this.weeks;

      for (let i = startWeek; i <= endWeek; i++) {
        const filteredItem = weeklyOrdersDto.filter(item => item.weekN == i);

        if (filteredItem.length == 0) {
          weeklyOrdersDto.push({ weekN: i, min: Date.now() as unknown as Date, count: 0 });
        }
      }
      weeklyOrdersDto.sort((firstItem, secondItem) => firstItem.weekN - secondItem.weekN);
      return weeklyOrdersDto;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getUserOrders(googleId: string): Promise<Orders[]> {
    try {
      const userOrdersData = await this.purchases.findAll({
        include: [
          {
            model: this.order,
          },
        ],
        where: { googleId },
        raw: true,
      });

      const userOrdersDataDTO: Orders[] = userOrdersData.map(item => {
        const newItem: Orders = {
          order_id: item['OrdersModel.order_id'],
          status: item['OrdersModel.status'],
          action: item['OrdersModel.action'],
          quantity: item['OrdersModel.quantity'],
          permId: item['OrdersModel.permId'],
          currency: item['OrdersModel.currency'],
          symbol: item['OrdersModel.symbol'],
          dateTime: item['OrdersModel.dateTime'],
        };

        return newItem;
      });

      return userOrdersDataDTO;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default OrderService;
