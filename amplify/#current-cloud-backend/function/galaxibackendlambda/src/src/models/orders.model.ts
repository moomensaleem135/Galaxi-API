import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Orders as Order } from '@interfaces/orders.interface';

export type OrderCreationAttributes = Optional<Order, 'order_id' | 'action' | 'currency' | 'symbol' | 'status' | 'permId' | 'quantity'>;

export class OrdersModel extends Model<Order, OrderCreationAttributes> implements Order {
  public order_id?: number;
  public status: string;
  public action: string;
  public quantity: number;
  public permId: number;
  public currency: string;
  public symbol: string;
  public dateTime: Date;
}

export default function (sequelize: Sequelize): typeof OrdersModel {
  OrdersModel.init(
    {
      order_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      action: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      permId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      currency: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      symbol: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      dateTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'orders',
      sequelize,
    },
  );

  return OrdersModel;
}
