import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Payment } from '@interfaces/payment.interface';

export type PaymentCreationAttributes = Optional<
  Payment,
  | 'id'
  | 'googleId'
  | 'action_id'
  | 'amount'
  | 'auth_code'
  | 'currency'
  | 'paymentID'
  | 'processed_on'
  | 'acquirer_transaction_id'
  | 'retrieval_reference_number'
  | 'reference'
>;

export class PaymentModel extends Model<Payment, PaymentCreationAttributes> implements Payment {
  public id: number;
  public googleId: string;
  public action_id: string;
  public amount: string;
  public auth_code: string;
  public currency: string;
  public paymentID: string;
  public processed_on: string;
  public acquirer_transaction_id: string;
  public retrieval_reference_number: string;
  public reference: string;
}

export default function (sequelize: Sequelize): typeof PaymentModel {
  PaymentModel.init(
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
      action_id: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      amount: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      auth_code: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      currency: { allowNull: false, type: DataTypes.STRING(45) },
      paymentID: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      processed_on: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      acquirer_transaction_id: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      retrieval_reference_number: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      reference: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'payments',
      sequelize,
    },
  );

  return PaymentModel;
}
