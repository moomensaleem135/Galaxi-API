import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { RecommendationsData } from '@/interfaces/recommendationsData.interface';

export type RecommendationsDataCreationAttributes = Optional<
RecommendationsData,
  | 'id'
  | 'ticker_symbol'
  | 'ticker_name'
  | 'ticker_currency'
  | 'ticker_exchange_zone'
  | 'strategy_data'
  | 'strategy_id'
  | 'is_scheduled'
  | 'ibkr_symbol'
  | 'old_ibkr_symbol'
  | 'ibkr_exchange'
  | 'date'
>;

export class RecommendationsDataModel extends Model<RecommendationsData, RecommendationsDataCreationAttributes> implements RecommendationsData {
  public id: number;
  public ticker_symbol: string;
  public ticker_name: string;
  public ticker_currency: string;
  public ticker_exchange_zone: string;
  public strategy_data: string;
  public strategy_id: number;
  public is_scheduled: boolean;
  public ibkr_symbol: string;
  public old_ibkr_symbol: string;
  public ibkr_exchange: string;
  public date: Date;
}

export default function (sequelize: Sequelize): typeof RecommendationsDataModel {
  RecommendationsDataModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ticker_symbol: {
        allowNull: false,
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
      ticker_exchange_zone: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      strategy_data: {
        allowNull: false,
        type: DataTypes.JSON,
      }, 
      strategy_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      is_scheduled: {
        type: DataTypes.BOOLEAN
      },
      ibkr_symbol: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      old_ibkr_symbol: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      ibkr_exchange: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      date: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'recommendations_data',
      sequelize,
      timestamps: false,
    },
  );
  return RecommendationsDataModel;
}
