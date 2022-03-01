import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { StripePayment } from '@interfaces/stripePayment.interface';

export type PaymentCreationAttributes = Optional<
  StripePayment,
  | 'id'
  | 'googleId'
  | 'amount'
  | 'stripeProcessingFees'
  | 'netAmount'
  | 'currency'
  | 'balanceTransactionId'
  | 'receiptUrl'
  | 'createdAt'
  | 'galaxiServiceCharges'
>;

export class StripePaymentModel extends Model<StripePayment, PaymentCreationAttributes> implements StripePayment {
  public id: number;
  public googleId: string;
  public amount: number;
  public stripeProcessingFees: number;
  public netAmount: number;
  public currency: string;
  public balanceTransactionId: string;
  public receiptUrl: string;
  public createdAt: string;
  public galaxiServiceCharges?: number;
}

export default function (sequelize: Sequelize): typeof StripePaymentModel {
  StripePaymentModel.init(
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
        type: DataTypes.FLOAT,
      },
      stripeProcessingFees: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      netAmount: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      currency: { allowNull: false, type: DataTypes.STRING(45) },
      balanceTransactionId: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      receiptUrl: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
      galaxiServiceCharges: {
        allowNull: true,
        type: DataTypes.FLOAT,
      }
    },
    {
      tableName: 'stripePayments',
      sequelize,
    },
  );

  return StripePaymentModel;
}
