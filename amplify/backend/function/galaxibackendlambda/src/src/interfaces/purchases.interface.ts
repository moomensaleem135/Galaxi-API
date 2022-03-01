import { getAllRequest, sortTypes } from "./users.interface"

export interface Purchase {
  id?: number;
  googleId: string;
  orderId: string;
  recommendationId: string;
  purchaseAmmount: string;
  dateTime: string;
  cryptoSymbol: string;
}

const sortFields = {
  id: 'id',
  googleId: 'google_id',
  order_id: 'order_id',
  recommendation_id: 'recommendation_id',
  purchase_ammount: 'purchase_ammount',
  date_time: 'date_time',
}
export const defaultPurchaseRequest: getAllRequest = {
  sortField: sortFields.id,
  sortType: sortTypes.ASC,
  offset: 0,
  size: 10
}
