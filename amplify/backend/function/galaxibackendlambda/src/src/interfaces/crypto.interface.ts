
export interface Crypto {
  crypto_symbol: string;
  crypto_change_rate: number;
  crypto_circulation: number;
  crypto_circualtion_usd: number;
  crypto_circualtion_usd_rank: number;
  crypto_online_time: number;
  crypto_price_usd: number;
  crypto_volume_usd: number;
  crypto_time_stamp: number;
  date: Date;
  update_date_time: Date;
  historical_data: string;
  status: string;
}

export interface CryptoLogo {
  crypto_symbol: string;
  crypto_logo: string;
  date_time: Date;
}
