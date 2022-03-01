import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import TickersDataGFController from '@/controllers/tickerDataGF.controller';
import isAdmin  from '@middlewares/isAdmin.middleware';

class TickersDataGFRoute implements Route {
  public path = '/gf/filter/';
  public router = Router();
  private tickersDataGFController = new TickersDataGFController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}get_all_tickers`, this.tickersDataGFController.get_all_data);
    this.router.get(`${this.path}fscore`, this.tickersDataGFController.filter_by_fscore);
    this.router.get(`${this.path}fcfy`, this.tickersDataGFController.filter_by_fcfy);
    this.router.get(`${this.path}pb`, this.tickersDataGFController.filter_by_pb);
    this.router.get(`${this.path}roic`, this.tickersDataGFController.filter_by_roic);
    this.router.get(`${this.path}ey`, this.tickersDataGFController.filter_by_ey);
    this.router.get(`${this.path}debt_to_equity`, this.tickersDataGFController.filter_by_debt_to_equity);
    this.router.get(`${this.path}peg_ratio`, this.tickersDataGFController.filter_by_peg_ratio);
    this.router.get(`${this.path}return_on_equity`, this.tickersDataGFController.filter_by_return_on_equity);
    this.router.get(`${this.path}dividend_yield`, this.tickersDataGFController.filter_by_dividend_yield);
    this.router.get(`${this.path}beta`, this.tickersDataGFController.filter_by_beta);
    this.router.get(`${this.path}payout_ratio`, this.tickersDataGFController.filter_by_payout_ratio);
    this.router.get(`${this.path}price_to_sales`, this.tickersDataGFController.filter_by_price_to_sales);
    this.router.get(`${this.path}price_to_earning`, this.tickersDataGFController.filter_by_price_to_earning);
    this.router.get(`${this.path}bottom_line`, this.tickersDataGFController.filter_by_bottom_line);
    this.router.get(`${this.path}free_cash_flow`, this.tickersDataGFController.filter_by_free_cash_flow);
    this.router.get(`${this.path}eps_growth_6_month`, this.tickersDataGFController.filter_by_eps_growth_6_month);
    this.router.get(`${this.path}eps_growth_1_year`, this.tickersDataGFController.filter_by_eps_growth_1_year);
    this.router.get(`${this.path}eps_growth_2_year`, this.tickersDataGFController.filter_by_eps_growth_2_year);
    this.router.get(`${this.path}apply_all`, this.tickersDataGFController.apply_all_filters);
  }
}

export default TickersDataGFRoute;
