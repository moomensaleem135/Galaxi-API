import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Recommendations } from '@/interfaces/recommendations.interface';

export type RecommendationsCreationAttributes = Optional<
  Recommendations,
  | 'id'
  | 'ticker_symbol'
  | 'ticker_name'
  | 'ticker_currency'
  | 'ticker_exchange_zone'
  | 'f_score_gf'
  | 'f_score_yf'
  | 'free_cash_flow_yield_gf'
  | 'free_cash_flow_yield_yf'
  | 'price_to_book_gf'
  | 'price_to_book_yf'
  | 'return_on_invested_capital_gf'
  | 'return_on_invested_capital_yf'
  | 'earning_yield_gf'
  | 'earning_yield_yf'
  | 'market_cap_gf'
  | 'market_cap_yf'
  | 'price_change_over_six_months_yf'
  | 'cash_on_hand_yf'
  | 'change_in_retained_earnings_yf'
  | 'date'
  | 'is_scheduled'
  | 'ibkr_symbol'
  | 'old_ibkr_symbol'
  | 'ibkr_exchange'
>;

export class RecommendationsModel extends Model<Recommendations, RecommendationsCreationAttributes> implements Recommendations {
  public id: number;
  public ticker_symbol: string;
  public ticker_name: string;
  public ticker_currency: string;
  public ticker_exchange_zone: string;
  public f_score_gf: string;
  public f_score_yf: string;
  public free_cash_flow_yield_gf: string;
  public free_cash_flow_yield_yf: string;
  public price_to_book_gf: string;
  public price_to_book_yf: string;
  public return_on_invested_capital_gf: string;
  public return_on_invested_capital_yf: string;
  public earning_yield_gf: string;
  public earning_yield_yf: string;
  public market_cap_gf: string;
  public market_cap_yf: string;
  public price_change_over_six_months_yf: string;
  public cash_on_hand_yf: string;
  public change_in_retained_earnings_yf: string;
  public date: Date;
  public is_scheduled: boolean;
  public ibkr_symbol: string;
  public old_ibkr_symbol: string;
  public ibkr_exchange: string;
}

export default function (sequelize: Sequelize): typeof RecommendationsModel {
  RecommendationsModel.init(
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
      f_score_gf: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      f_score_yf: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      free_cash_flow_yield_gf: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      free_cash_flow_yield_yf: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      price_to_book_gf: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      price_to_book_yf: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      return_on_invested_capital_gf: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      return_on_invested_capital_yf: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      earning_yield_gf: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      earning_yield_yf: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      market_cap_gf: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      market_cap_yf: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      price_change_over_six_months_yf: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      cash_on_hand_yf: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      change_in_retained_earnings_yf: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      date: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.DATE,
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
    },
    {
      tableName: 'recommendations',
      sequelize,
      timestamps: false,
    },
  );
  // RecommendationsModel.hasMany(DB.Purchases, {foreignKey: 'recommendation_id'})
  return RecommendationsModel;
}
