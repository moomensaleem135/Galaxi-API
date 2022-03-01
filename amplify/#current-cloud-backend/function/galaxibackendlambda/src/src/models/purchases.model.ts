import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Purchase } from '@interfaces/purchases.interface';

export type PurchaseCreationAttributes = Optional<Purchase, 'id' | 'googleId' | 'orderId' | 'recommendationId' | 'purchaseAmmount' | 'dateTime' | 'cryptoSymbol'>;

export class PurchaseModel extends Model<Purchase, PurchaseCreationAttributes> implements Purchase {
  public id: number;
  public googleId: string;
  public orderId: string;
  public recommendationId: string;
  public purchaseAmmount: string;
  public dateTime: string;
  public cryptoSymbol: string;
  purchase_ammount: string;
  Sum: number;
}

export default function (sequelize: Sequelize): typeof PurchaseModel {
  PurchaseModel.init(
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
      orderId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      recommendationId: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      purchaseAmmount: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      dateTime: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      cryptoSymbol: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'purchases',
      sequelize,
    },
  );

  return PurchaseModel;
}
