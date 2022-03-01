import { getAllRequest, sortTypes } from "./users.interface";

export interface Orders {
  order_id?: number;
  status: string;
  action: string;
  quantity: number;
  permId: number;
  currency: string;
  symbol: string;
  dateTime: Date;
}

const sortFields = {
  orderID: 'order_id',
  status: 'status',
  action: 'action',
  quantity: 'quantity',
  permId: 'perm_id',
  currency: 'currency',
  symbol: 'symbol',
  dateTime: 'date_time',
}
export const defaultOrderRequest: getAllRequest = {
  sortField: sortFields.orderID,
  sortType: sortTypes.ASC,
  offset: 0,
  size: 10
}