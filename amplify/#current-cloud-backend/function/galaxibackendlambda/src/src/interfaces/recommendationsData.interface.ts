export interface RecommendationsData {
  id: number;
  ticker_symbol: string;
  ticker_name: string;
  ticker_currency: string;
  ticker_exchange_zone: string;
  strategy_data: string;
  strategy_id: number;
  is_scheduled:Boolean
  ibkr_symbol:string
  old_ibkr_symbol: String
  ibkr_exchange: String
  date: Date
}
