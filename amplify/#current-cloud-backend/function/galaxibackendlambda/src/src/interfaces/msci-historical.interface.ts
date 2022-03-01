export interface MsciHistorical {
  id: number;
  open_price: number;
  close_price: number;
  pe_ratio: number;
  date_time: Date;
}

export enum FREQUENCY {
  'one-day' = '1d',
  'three-days' = '3d',
  'week' = '1w',
  'one-month' = '1m',
  'three-months' = '3m',
  'six-months' = '6m',
  'one-year' = '1y',
  'three-year' = '3y',
  'five-year' = '5y',
  'ten-year' = '10y',
  'max' = 'max',
}