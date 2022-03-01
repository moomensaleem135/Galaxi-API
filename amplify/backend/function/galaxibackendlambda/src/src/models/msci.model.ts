import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { MSCI } from '@/interfaces/msci.interface';

export type MsciCreationAttributes = Optional<
  MSCI,
  | 'id'
  | 'monthly_data'
  | 'weekly_data'
  | 'daily_data'
  | 'date'
>;

export class MsciModel extends Model<MSCI, MsciCreationAttributes> implements MSCI {
  public id: number;
  public monthly_data: string; 
  public weekly_data: string;
  public daily_data: string;
  public date: Date;
}

export default function (sequelize: Sequelize): typeof MsciModel {
  MsciModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      monthly_data: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      weekly_data: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      daily_data: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      date: {
        allowNull: true,
        type: DataTypes.DATE
      }
    },
    {
      tableName: 'msci_data',
      sequelize,
      timestamps: false,
    },
  );

  return MsciModel;
}
