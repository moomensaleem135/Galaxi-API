import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { MsciHistorical } from '@/interfaces/msci-historical.interface';

export type MsciHistoricalCreationAttributes = Optional<MsciHistorical, 'id' | 'close_price' | 'open_price' | 'pe_ratio' | 'date_time'>;

export class MsciHistoricalModel extends Model<MsciHistorical, MsciHistoricalCreationAttributes> implements MsciHistorical {
  public id: number;
  public open_price: number;
  public close_price: number;
  public pe_ratio: number;
  public date_time: Date;
}

export default function (sequelize: Sequelize): typeof MsciHistoricalModel {
  MsciHistoricalModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      close_price: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      open_price: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      pe_ratio: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      date_time: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'msci_data_historical',
      sequelize,
      timestamps: false,
    },
  );

  return MsciHistoricalModel;
}
