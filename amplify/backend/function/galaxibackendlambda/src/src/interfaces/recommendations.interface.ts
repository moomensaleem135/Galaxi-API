export interface Recommendations {
  id: number;
  ticker_symbol: string;
  ticker_name: string;
  ticker_currency: string;
  ticker_exchange_zone: string;
  f_score_gf: string;
  f_score_yf: string;
  free_cash_flow_yield_gf: string;
  free_cash_flow_yield_yf: string;
  price_to_book_gf: string;
  price_to_book_yf: string;
  return_on_invested_capital_gf: string;
  return_on_invested_capital_yf: string;
  earning_yield_gf: string;
  earning_yield_yf: string;
  market_cap_gf: string;
  market_cap_yf: string;
  price_change_over_six_months_yf: string;
  cash_on_hand_yf: string;
  change_in_retained_earnings_yf: string;
  date: Date;
  is_scheduled: boolean;
  ibkr_symbol: string;
  old_ibkr_symbol: string;
  ibkr_exchange: string;
}
