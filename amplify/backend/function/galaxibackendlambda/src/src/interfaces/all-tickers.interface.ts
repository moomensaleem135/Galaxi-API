export interface AllTickers {
  ticker_symbol: string;
  ticker_name: string;
  ticker_currency: string;
  ticker_type: string;
  ticker_exchange_zone: string;
  is_valid_gf: boolean;
  ticker_date_time: Date;
  is_valid_yf: boolean;
  ibkr_symbol: string;
  old_ibkr_symbol: string;
  ibkr_exchange: string;
}
