import DB from '@databases';
import HttpException from '@exceptions/HttpException';
import { createRule, isEmpty } from '@utils/util';
import { RecommendationsData } from '@interfaces/recommendationsData.interface';
import { Op } from 'sequelize';

class TradingStrategyService {
  public strategies = DB.StrategyModel;
  public tickersData = DB.TickersDataYF;
  public recommendationsData = DB.RecommendationsData;

  public async insertStrategy(req: any): Promise<any> {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Invalid Data');
      await this.strategies.create({ ...req });
      return this.strategies as any;
    } catch (error) {
      throw new Error(error);
    }
  }

  public unloadObj = dt => {
    const obj = JSON.parse(dt);
    delete obj['all_data'];
    delete obj['p2brank'];
    delete obj['p2srank'];
    delete obj['ebitda2evrank'];
    delete obj['pcfrank'];
    delete obj['p2erank'];
    delete obj['syrank'];
    delete obj['totalRank'];
    return { ...obj };
  };

  public async getAllStrategiesData(req: any): Promise<RecommendationsData[]> {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Invalid Data');
      const { id, offset, limit } = req;
      const all_tickers = await this.recommendationsData.findAll({
        limit: limit ? limit : 100, 
        offset: offset ? offset : 0,
        where: {
          strategy_id: {
            [Op.eq]: id,
          },
        },
      });

      const result = all_tickers.map(ticker => {
        return {
          id: ticker.id,
          ...this.unloadObj(ticker.strategy_data),
          strategy_id: ticker.strategy_id,
          is_scheduled: ticker.is_scheduled,
        };
      });
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

}
export default TradingStrategyService;
