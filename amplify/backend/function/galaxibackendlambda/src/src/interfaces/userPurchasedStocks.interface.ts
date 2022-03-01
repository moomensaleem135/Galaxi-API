export interface IUserPurchasedStocks {
  date_time: Date;
  purchase_ammount: number;
  RecommendationsModel: {
    ticker_symbol: string;
    ticker_name: string;
  };
}

export interface IUserPurchasedStocksDTO {
  date_time: string;
  purchase_ammount: string;
  ticker_symbol: string;
  ticker_name: string;
}

export interface IGetSumDTO {
  amount: number;
  ticker_symbol: string;
}
