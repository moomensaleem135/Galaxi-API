import { Request, Response } from 'express';
import tradingStrategyService from '@services/strategy.service';
import { RecommendationsData } from '@interfaces/recommendationsData.interface';


class TradingStrategyController {
  public tradingStrategyService = new tradingStrategyService();

  public insertStrategy = async (req: Request, res: Response) => {
    try {
      const strategyData: any = await this.tradingStrategyService.insertStrategy(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data:strategyData });
    } catch (error: any) {
      console.log('Error in Auth Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public getAllQualityStocks = async (req: Request, res: Response) => {
    try {
      const strategyData: RecommendationsData[] = await this.tradingStrategyService.getAllStrategiesData(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data:strategyData });
    } catch (error: any) {
      console.log('Error in Auth Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

}

export default TradingStrategyController;
