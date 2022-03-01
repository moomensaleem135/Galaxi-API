import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import MsciController from '@/controllers/msci.controller';
import isUser from '@middlewares/isUser.middleware';

class MsciRoute implements Route {
  public path = '/msci/index/';
  public router = Router();
  private msciController = new MsciController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}monthly`, isUser, this.msciController.get_monthly_data);
    this.router.post(`${this.path}weekly`, isUser, this.msciController.get_weekly_data);
    this.router.post(`${this.path}daily`, isUser, this.msciController.get_daily_data);
    this.router.post(`${this.path}historical/data`, isUser, this.msciController.get_historical_data);
  }
}

export default MsciRoute;
