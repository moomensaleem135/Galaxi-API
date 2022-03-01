import DB from '@databases';
import { Recommendations } from '@/interfaces/recommendations.interface';
import sequelize, { Op } from 'sequelize';
import { IweeklyUsers } from '@/interfaces/userBalance.interface';
import { weekNumber } from 'weeknumber';
import { createRule } from '@/utils/util';

class RecommendationsService {
  private recommendationTable = DB.Recommendations;
  private recommendationDataTable = DB.RecommendationsData;
  private daysInWeek = 7;
  private weeks = 5;
  private sixWeekAgo = new Date(new Date().setDate(new Date().getDate() - this.daysInWeek * this.weeks));

  public async get_recommendations(): Promise<Recommendations[]> {
    try {
      const latestDate = await this.recommendationTable.findOne({
        order: [['date', 'desc']],
      });
      return this.recommendationTable.findAll({
        where: {
          date: {
            [Op.eq]: latestDate.date as any,
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public async scheduled_recommendations(q_dict: any): Promise<any> {
    try {
      const recommendations_id = q_dict.recommendations_id;
      const trading_strategy_id = q_dict.trading_strategy_id;
      const scheduledData = {
        recommendations_id,
        status: 'In Process',
        percentage: q_dict.percentage,
        date_time: new Date(),
        trading_strategy_id: trading_strategy_id,
      };
      await this.recommendationDataTable.findOne({
        where: {
          id: recommendations_id,
        },
      });
      const scheduleRecommendation = DB.Scheduled;
      const scheduled = await scheduleRecommendation.create({ ...scheduledData });
      await this.recommendationDataTable.update(
        {
          is_scheduled: true,
        },
        {
          where: {
            id: recommendations_id,
          },
        },
      );
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

      }
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getWeeklyRecommendations() {
    try {
      const weeklyRecommendations = await this.recommendationTable.count({
        attributes: [
          [sequelize.fn('date_part', 'week', sequelize.col('date')), 'weekN'],
          [sequelize.fn('min', sequelize.col('date')), 'min'],
          // [sequelize.fn('sum', sequelize.col('purchase_ammount')), 'sum'],
        ],
        where: {
          date: { [Op.between]: [this.sixWeekAgo, Date.now() as unknown as Date] },
        },
        group: ['weekN'],
      });
      const weeklyRecommendationsDto = weeklyRecommendations as unknown as IweeklyUsers[];

      const startWeek = weekNumber(this.sixWeekAgo);
      const endWeek = startWeek + this.weeks;

      for (let i = startWeek; i <= endWeek; i++) {
        const filteredItem = weeklyRecommendationsDto.filter(item => item.weekN == i);
        if (filteredItem.length == 0) {
          weeklyRecommendationsDto.push({ weekN: i, min: Date.now() as unknown as Date, count: 0 });
        }
      }
      weeklyRecommendationsDto.sort((firstItem, secondItem) => firstItem.weekN - secondItem.weekN);
      return weeklyRecommendationsDto;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default RecommendationsService;
