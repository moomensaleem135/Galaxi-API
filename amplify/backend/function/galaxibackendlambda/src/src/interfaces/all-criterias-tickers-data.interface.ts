import { AllTickersModel } from "@/models/all-tickers.model";
import { TickersDataGFModel } from "@/models/tickers-data-gf.model";
import { TickersDataYFModel } from "@/models/tickers-data-yf.model";

export interface AllCriteriaTickersData {
  ticker_symbol_gf: string;
  f_score_gf: string;
  free_cash_flow_yield_gf: string;
  price_to_book_gf: string;
  return_on_invested_capital_gf: string;
  earning_yield_gf: string;
  market_cap_gf: string;
  ticker_symbol_yf: string;
  f_score_yf: string;
  free_cash_flow_yield_yf: string;
  price_to_book_yf: string;
  return_on_invested_capital_yf: string;
  earning_yield_yf: string;
  market_cap_yf: string;
  price_change_over_six_months: string;
  change_in_retained_earnings_yf: string;
  cash_on_hand_yf: string;
}

export interface AllCriterias{
  Gf: TickersDataGFModel;
  tickers: AllTickersModel;
  Yf: TickersDataYFModel;
}
