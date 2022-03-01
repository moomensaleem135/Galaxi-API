import { getAllRequest, sortTypes } from "./users.interface"

export interface Payment {
  id?: number;
  googleId: string;
  action_id: string;
  amount: string;
  auth_code: string;
  currency: string;
  paymentID: string // id: "pay_sqcneraa7ywklof5mogsxcdqrq"
  processed_on: string;
  acquirer_transaction_id: string;
  retrieval_reference_number: string;
  reference: string; 
}

const sortFields = {
  id: 'id',
  googleId: 'google_id',
  action_id: 'action_id',
  amount: 'amount',
  auth_code: 'auth_code',
  currency: 'currency',
  paymentID: 'payment_i_d',
  processed_on: 'processed_on',
  acquirer_transaction_id: 'acquirer_transaction_id',
  retrieval_reference_number: 'retrieval_reference_number',
  reference: 'reference'
}
export const defaultPaymentRequest: getAllRequest = {
  sortField: sortFields.id,
  sortType: sortTypes.ASC,
  offset: 0,
  size: 10
}