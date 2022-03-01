export interface ScheduledCryptos {
  id: number;
  status: string;
  crypto_symbol: string;
  percentage: number;
  warning_message: string;
  reason: string;
  created_at: Date;
  updated_at: Date;
}

export interface ScheduledCryptoResponse {
  id: number;
  status: string;
  crypto_symbol: string;
  percentage: number;
  warning_message: string;
  reason: string;
  rule: any;
}
