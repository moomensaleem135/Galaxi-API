import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { bankTransferstatus, IbankTransferstatus, WithdrawBankTransfer } from '@interfaces/withdrawBankTransfer.interface';

export type WithdrawBankTransferCreationAttributes = Optional<
WithdrawBankTransfer,
  | 'id'
  | 'googleId'
  | 'amount'
  | 'bankTransferFee'
  | 'netAmount'
  | 'currency'
  | 'balanceTransactionId'
  | 'destinationId'
  | 'destinationPaymentId'
  | 'transferId'
  | 'createdAt'
  | 'updatedAt'
>;

export class WithdrawBankTransferModel extends Model<WithdrawBankTransfer, WithdrawBankTransferCreationAttributes> implements WithdrawBankTransfer {
  public id: number;
  public googleId: string;
  public amount: number;
  public bankTransferFee: number;
  public netAmount: number;
  public currency: string;
  public balanceTransactionId: string;
  public transferId: string;
  public destinationId: string;
  public destinationPaymentId: string;
  public status: string;
  public createdAt: string;
  public updatedAt?: string;
}

export default function (sequelize: Sequelize): typeof WithdrawBankTransferModel {
  WithdrawBankTransferModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      googleId: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      amount: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      bankTransferFee: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      netAmount: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      currency: { allowNull: false, type: DataTypes.STRING(45) },
      balanceTransactionId: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      transferId: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      destinationId: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      destinationPaymentId: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      status: {
        type: DataTypes.STRING(255),
        defaultValue: bankTransferstatus.PENDING,
      },
      createdAt: {
        defaultValue: Date.now(),
        type: DataTypes.DATE,
      },
      updatedAt: {
        defaultValue: Date.now(),
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'withdrawBankTransfer',
      sequelize,
    },
  );

  return WithdrawBankTransferModel;
}
