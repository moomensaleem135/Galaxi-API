import { getAllRequest, sortTypes } from "./users.interface"

export interface WithdrawBankTransfer {
  id?: number;
  googleId: string;
  transferId: string
  amount: number;
  bankTransferFee: number;
  netAmount: number
  currency: string;
  balanceTransactionId: string;
  destinationId: string;
  destinationPaymentId: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IbankTransferstatus {
  PENDING: string,
  DONE: string
}

export const bankTransferstatus  = {
  PENDING: 'PENDING',
  DONE: 'DONE'
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
export const defaultWithdrawBankTransferRequest: getAllRequest = {
  sortField: sortFields.id,
  sortType: sortTypes.ASC,
  offset: 0,
  size: 10
}