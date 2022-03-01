import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import TickersDataYFController from '@/controllers/tickerDataYF.controller';
import isAdmin  from '@middlewares/isAdmin.middleware';

class TickersDataYFRoute implements Route {
  public path = '/yf/filter/';
  public router = Router();
  private tickersDataYFController = new TickersDataYFController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}get_all_tickers`, this.tickersDataYFController.get_all_data);
    this.router.post(`${this.path}fscore`, this.tickersDataYFController.filter_by_fscore);
    this.router.post(`${this.path}fcfy`, this.tickersDataYFController.filter_by_fcfy);
    this.router.post(`${this.path}pb`, this.tickersDataYFController.filter_by_pb);
    this.router.post(`${this.path}roic`, this.tickersDataYFController.filter_by_roic);
    this.router.post(`${this.path}ey`, this.tickersDataYFController.filter_by_ey);
    this.router.post(`${this.path}debt_to_equity`, this.tickersDataYFController.filter_by_debt_to_equity);
    this.router.post(`${this.path}peg_ratio`, this.tickersDataYFController.filter_by_peg_ratio);
    this.router.post(`${this.path}return_on_equity`, this.tickersDataYFController.filter_by_return_on_equity);
    this.router.post(`${this.path}dividend_yield`, this.tickersDataYFController.filter_by_dividend_yield);
    this.router.post(`${this.path}beta`, this.tickersDataYFController.filter_by_beta);
    this.router.post(`${this.path}payout_ratio`, this.tickersDataYFController.filter_by_payout_ratio);
    this.router.post(`${this.path}price_to_sales`, this.tickersDataYFController.filter_by_price_to_sales);
    this.router.post(`${this.path}price_to_earning`, this.tickersDataYFController.filter_by_price_to_earning);
    this.router.post(`${this.path}bottom_line`, this.tickersDataYFController.filter_by_bottom_line);
    this.router.post(`${this.path}free_cash_flow`, this.tickersDataYFController.filter_by_free_cash_flow);
    this.router.post(`${this.path}eps_growth_6_month`, this.tickersDataYFController.filter_by_eps_growth_6_month);
    this.router.post(`${this.path}eps_growth_1_year`, this.tickersDataYFController.filter_by_eps_growth_1_year);
    this.router.post(`${this.path}eps_growth_2_year`, this.tickersDataYFController.filter_by_eps_growth_2_year);
    this.router.post(`${this.path}retained_earnings`, this.tickersDataYFController.filter_by_retained_earnings);
    this.router.post(`${this.path}cash_on_hand`, this.tickersDataYFController.filter_by_cash_on_hand);
    this.router.post(`${this.path}apply_all`, isAdmin, this.tickersDataYFController.apply_all_filters);
    this.router.post(`${this.path}free_cash_flow_to_equity`, this.tickersDataYFController.filter_by_free_cash_flow);
  }
}

export default TickersDataYFRoute;
