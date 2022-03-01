import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { AllTickers } from '@/interfaces/all-tickers.interface';

export type AllTickersCreationAttributes = Optional<
  AllTickers,
  | 'ticker_symbol'
  | 'ticker_name'
  | 'ticker_currency'
  | 'ticker_type'
  | 'ticker_exchange_zone'
  | 'is_valid_gf'
  | 'ticker_date_time'
  | 'is_valid_yf'
  | 'ibkr_symbol'
  | 'old_ibkr_symbol'
  | 'ibkr_exchange'
>;

export class AllTickersModel extends Model<AllTickers, AllTickersCreationAttributes> implements AllTickers {
  public ticker_symbol: string;
  public ticker_name: string;
  public ticker_currency: string;
  public ticker_type: string;
  public ticker_exchange_zone: string;
  public is_valid_gf: boolean;
  public ticker_date_time: Date;
  public is_valid_yf: boolean;
  public ibkr_symbol: string;
  public old_ibkr_symbol: string;
  public ibkr_exchange: string;
}

export default function (sequelize: Sequelize): typeof AllTickersModel {
  AllTickersModel.init(
    {
      ticker_symbol: {
        primaryKey: true,
        type: DataTypes.STRING(255),
      },
      ticker_name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      ticker_currency: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      ticker_type: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      ticker_exchange_zone: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      is_valid_gf: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      ticker_date_time: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      is_valid_yf: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      ibkr_symbol: {
        allowNull: true,
        type: DataTypes.STRING(255)
      },
      old_ibkr_symbol: {
        allowNull: true,
        type: DataTypes.STRING(255)
      },
      ibkr_exchange: {
        allowNull: true,
        type: DataTypes.STRING(255)
      }
    },
    {
      tableName: 'tickers',
      sequelize,
      timestamps: false,
    },
  );

  return AllTickersModel;
}
