export interface MemberShipInterface {
  id: number;
  price: number;
  description: string;
  title: string;
  sub_title: string;
  date_time: Date;
  time_period: string;
  price2: number;
}

export interface MemberShipUserInterface {
  id: number;
  price: number;
  title: string;
  expiration_time: Date;
  is_cancel?: boolean;
}