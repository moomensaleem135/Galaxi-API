export interface MSCI {
  id: number;
  monthly_data: string; 
  weekly_data: string;
  daily_data: string;
  date: Date;
}

export interface MsciResponse {
  date: number;
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
  adjclose: number;
  formatted_date: string;
  pe: number;
  year: number;
  month: number;
  week: number;
}
