import { getAllRequest, sortTypes } from "./users.interface"

export interface StripePayment {
  id?: number;
  googleId: string;
  amount: number;
  stripeProcessingFees: number;
  netAmount: number
  currency: string;
  balanceTransactionId: string;
  receiptUrl: string;
  createdAt?: string;
  galaxiServiceCharges?: number;
}

const sortFields = {
  id: 'id',
  googleId: 'google_id',
  amount: 'amount',
  currency: 'currency',
  stripeProcessingFees: 'stripe_processing_fees',
  netAmount: 'net_amount',
  balanceTransactionId: 'balance_transaction_id',
  receiptURL: 'receipt_url',
  createdAt: 'created_at'
}
export const defaultStripePaymentRequest: getAllRequest = {
  sortField: sortFields.id,
  sortType: sortTypes.ASC,
  offset: 0,
  size: 10
}