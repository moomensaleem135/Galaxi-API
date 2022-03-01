import { IweeklyUsers } from '@/interfaces/userBalance.interface';
import { getAllRequest } from '@/interfaces/users.interface';

import DB from '@databases';
import { ScheduledRecommendations } from '@/interfaces/schedule_recommendations.interface';
import sequelize, { Op } from 'sequelize';
import { weekNumber } from 'weeknumber';
import { Recommendations } from '@/interfaces/recommendations.interface';
import { RecommendationsData } from '@/interfaces/recommendationsData.interface';
import { createRule } from '@/utils/util';
import HttpException from '@/exceptions/HttpException';

interface AllSchedulRecommedationModel {
  id: number;
  status: string;
  percentage: number;
  date_time: Date;
  // RecommendationsModel?: Recommendations;
  RecommendationsDataModel?: RecommendationsData;
  recommendations_id?: number;
  // recommendations_data_id?: number;
  reason: string;
  warning_message: string;
  trading_strategy_id: number;
}

class ScheduleRecommendationsService {
  private scheduledRecommendation = DB.Scheduled;
  private recommendationTable = DB.RecommendationsData;
  private tickersTable = DB.Tickers;

  private daysInWeek = 7;
  private weeks = 5;
  private sixWeekAgo = new Date(new Date().setDate(new Date().getDate() - this.daysInWeek * this.weeks));

  public getRecommendationsDataResp = res => {
    if (res.RecommendationsModel) {
      return {
        ticker_symbol: res.RecommendationsModel.ticker_symbol,
        ticker_name: res.RecommendationsModel.ticker_name,
        ticker_currency: res.RecommendationsModel.ticker_currency,
        ticker_exchange_zone: res.RecommendationsModel.ticker_exchange_zone,
        ibkr_symbol: res.RecommendationsModel.ibkr_symbol,
        ibkr_exchange: res.RecommendationsModel.ibkr_exchange,
      };
    } else if (res.RecommendationsDataModel) {
      return {
        ticker_symbol: res.RecommendationsDataModel.ticker_symbol,
        ticker_name: res.RecommendationsDataModel.ticker_name,
        ticker_currency: res.RecommendationsDataModel.ticker_currency,
        ticker_exchange_zone: res.RecommendationsDataModel.ticker_exchange_zone,
        ibkr_symbol: res.RecommendationsDataModel.ibkr_symbol,
        ibkr_exchange: res.RecommendationsDataModel.ibkr_exchange,
      };
    }
  };
  public async getAllScheduledRecommendations(req: getAllRequest): Promise<ScheduledRecommendations[]> {
    const { size, sortField, sortType, offset } = req;

    try {
      const scheduledRecommendationData: AllSchedulRecommedationModel[] = await this.scheduledRecommendation.findAll({
        offset,
        limit: size,
        order: [[sequelize.col(`${sortField}`), sortType]],
        include: [
          // {
          //   model: DB.Recommendations,
          // },
          {
            model: DB.RecommendationsData,
          },
        ],
      });
      const result = scheduledRecommendationData.map(res => {
        return {
          id: res.id,
          status: res.status,
          percentage: res.percentage,
          ...this.getRecommendationsDataResp(res),
          date_time: res.date_time,
          recommendations_id: res.recommendations_id,
          // recommendations_data_id: res.recommendations_data_id,
          reason: res.reason,
          warning_message: res.warning_message,
          trading_strategy_id: res.trading_strategy_id,
        };
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAllScheduledRecommendationCount(): Promise<number> {
    try {
      const count = await this.scheduledRecommendation.count();
      return count;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getWeeklyScheduledRecommendations() {
    try {
      const weeklyScheduledRecommendations = await this.scheduledRecommendation.count({
        attributes: [
          [sequelize.fn('date_part', 'week', sequelize.col('date_time')), 'weekN'],
          [sequelize.fn('min', sequelize.col('date_time')), 'min'],
          // [sequelize.fn('sum', sequelize.col('purchase_ammount')), 'sum'],
        ],
        where: {
          date_time: { [Op.between]: [this.sixWeekAgo, Date.now() as unknown as Date] },
        },
        group: ['weekN'],
      });
      const weeklyScheduledRecommendationsDto = weeklyScheduledRecommendations as unknown as IweeklyUsers[];

      const startWeek = weekNumber(this.sixWeekAgo);
      const endWeek = startWeek + this.weeks;

      for (let i = startWeek; i <= endWeek; i++) {
        const filteredItem = weeklyScheduledRecommendationsDto.filter(item => item.weekN == i);

        if (filteredItem.length == 0) {
          weeklyScheduledRecommendationsDto.push({ weekN: i, min: Date.now() as unknown as Date, count: 0 });
        }
      }
      weeklyScheduledRecommendationsDto.sort((firstItem, secondItem) => firstItem.weekN - secondItem.weekN);
      return weeklyScheduledRecommendationsDto;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async updateScheduledRecommendation(query_dict: any) {
    try {
      const id = query_dict.id;
      const new_ibkr_symbol = query_dict.ibkr_symbol;
      const new_ibkr_exchange = query_dict.ibkr_exchange;
      const new_ibkr_currency = query_dict.currency;
      const isMagic = query_dict.isMagic;

      const scheRecommendation = await this.scheduledRecommendation.findOne({
        where: {
          id,
        },
      });
      const recommendation = await this.recommendationTable.findOne({
        where: {
          id: scheRecommendation.recommendations_id,
        },
      });

      let tickersData = null;
      if (recommendation.ibkr_symbol) {
        tickersData = await this.tickersTable.findAll({
          where: {
            ibkr_symbol: recommendation.ibkr_symbol,
          },
        });
      } else {
        tickersData = await this.tickersTable.findAll({
          where: sequelize.where(sequelize.fn('lower', sequelize.col('ticker_name')), recommendation.ticker_name.toLowerCase()),
        });
      }
      if (tickersData.length > 0 && recommendation.id) {
        for (let index = 0; index < tickersData.length; index++) {
          const element = tickersData[index];
          element.set({
            old_ibkr_symbol: element.ibkr_symbol,
            ibkr_symbol: new_ibkr_symbol,
            ibkr_exchange: new_ibkr_exchange,
          });
          element.save();
        }
        await this.recommendationTable.update(
          {
            old_ibkr_symbol: recommendation.ibkr_symbol,
            ibkr_symbol: new_ibkr_symbol,
            ibkr_exchange: new_ibkr_exchange,
            ticker_currency: new_ibkr_currency,
          },
          {
            where: {
              id: recommendation.id,
            },
          },
        );
        await this.scheduledRecommendation.update(
          {
            status: 'In Process',
            reason: '',
            warning_message: '',
          },
          {
            where: {
              id,
            },
          },
        );
        const scheRecommendationData = await this.scheduledRecommendation.findOne({
          where: {
            id,
          },
        });
        const ruleResponse = await createRule();
        console.log('ruleResponse', ruleResponse);
        return { ...scheRecommendationData, ruleResponse };
      } else {
        throw new HttpException(400, 'Unable To Update the data');
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  public async retryScheduledRecommendation(query_dict: any) {
    try {
      const id = query_dict.id;
      await this.scheduledRecommendation.update(
        {
          status: 'In Process',
          reason: '',
          warning_message: '',
        },
        {
          where: {
            id,
          },
        },
      );
      const scheduled = await this.scheduledRecommendation.findOne({
        where: {
          id,
        },
      });
      const ruleResponse = await createRule();
      const resp = {
        id: scheduled.id,
        status: scheduled.status,
        recommendations_id: scheduled.recommendations_id,
        percentage: scheduled.percentage,
        date_time: scheduled.date_time,
        reason: scheduled.reason,
        warning_message: scheduled.warning_message,
        recommendationsModel: scheduled.recommendationsModel,
        recommendationsDataModel: scheduled.recommendationsDataModel,
        trading_strategy_id: scheduled.trading_strategy_id,
        rule: ruleResponse,
      };
      return { ...resp, ruleResponse };
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default ScheduleRecommendationsService;
