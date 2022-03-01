import { Router } from 'express';
import TradingstrategyController from '@controllers/strategy.controller';
import isAdmin  from '@/middlewares/isAdmin.middleware';
import Route from '@interfaces/routes.interface';

class TradingStrategyRoute implements Route {
  public path = '/strategies/';
  public router = Router();
  public tradingStrategyController = new TradingstrategyController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}insert`, isAdmin,  this.tradingStrategyController.insertStrategy);
    this.router.post(`${this.path}getAll`, isAdmin, this.tradingStrategyController.getAllQualityStocks);
  }
}

export default TradingStrategyRoute;
