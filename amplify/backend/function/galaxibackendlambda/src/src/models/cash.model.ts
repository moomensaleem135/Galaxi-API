import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Cash } from '@interfaces/cash.interface';
import { UserModel } from './users.model';

export type CashCreationAttributes = Optional<
  Cash,
  'id' | 'googleId' | 'settledCash' | 'unsettledCash' | 'currentBalance'
>;

export class CashModel extends Model<Cash, CashCreationAttributes> implements Cash {
  public id: number;
  public googleId: string;
  public settledCash: number;
  public unsettledCash: number;
  public currentBalance: number;
  
}

export default function (sequelize: Sequelize): typeof CashModel {
  CashModel.init(
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
      settledCash: {
        type: DataTypes.INTEGER
      },
      unsettledCash: {
        type: DataTypes.INTEGER
      },
      currentBalance: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'cash',
      sequelize,
    },
  );

  CashModel.belongsTo(UserModel)
  //   , {
  //   foreignKey: 'googleId',
  //   // constraints: false,

  // })

  return CashModel;
}
