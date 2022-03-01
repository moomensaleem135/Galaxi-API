import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { TickersDataGF } from '@/interfaces/tickers-data-gf.interface';
import { AllTickersModel } from './all-tickers.model';

export type TickerDataGfCreationAtrributes = Optional<
  TickersDataGF,
  | 'ticker_symbol'
  | 'f_score'
  | 'free_cash_flow_yield'
  | 'price_to_book'
  | 'return_on_invested_capital'
  | 'earning_yield'
  | 'market_cap'
  | 'date'
  | 'debt2equity'
  | 'peg_ratio'
  | 'price2earning'
  | 'return_on_equity'
  | 'dividend_yield'
  | 'beta'
  | 'payout_ratio'
  | 'price2sales'
  | 'bottom_line'
  | 'free_cash_flow'
  | 'eps_growth_6_month'
  | 'eps_growth_1_year'
  | 'eps_growth_2_year'
>;

export const TickerDataGfSortAtrributes = [
  'ticker_symbol',
  'f_score',
  'free_cash_flow_yield',
  'price_to_book',
  'return_on_invested_capital',
  'earning_yield',
  'market_cap',
  'date',
  'debt2equity',
  'peg_ratio',
  'price2earning',
  'return_on_equity',
  'dividend_yield',
  'beta',
  'payout_ratio',
  'price2sales',
  'bottom_line',
  'free_cash_flow',
  'eps_growth_6_month',
  'eps_growth_1_year',
  'eps_growth_2_year',
];

export class TickersDataGFModel extends Model<TickersDataGF, TickerDataGfCreationAtrributes> implements TickersDataGF {
  public ticker_symbol: string;
  public f_score: Number;
  public free_cash_flow_yield: Number;
  public price_to_book: Number;
  public return_on_invested_capital: Number;
  public earning_yield: Number;
  public market_cap: Number;
  public date: Date;
  public AllTickersModel: AllTickersModel;
  public debt2equity: Number;
  public peg_ratio: Number;
  public price2earning: Number;
  public return_on_equity: Number;
  public dividend_yield: Number;
  public beta: Number;
  public payout_ratio: Number;
  public price2sales: Number;
  public bottom_line: Number;
  public free_cash_flow: Number;
  public eps_growth_6_month: Number;
  public eps_growth_1_year: Number;
  public eps_growth_2_year: Number;
}

export default function (sequelize: Sequelize): typeof TickersDataGFModel {
  TickersDataGFModel.init(
    {
      ticker_symbol: {
        primaryKey: true,
        type: DataTypes.STRING(250),
      },
      f_score: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      free_cash_flow_yield: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      price_to_book: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      return_on_invested_capital: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      earning_yield: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      market_cap: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      date: {
        allowNull: true,
        type: DataTypes.DATE,
        primaryKey: true,
      },
      debt2equity: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      peg_ratio: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      price2earning: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      return_on_equity: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      dividend_yield: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      beta: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      payout_ratio: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      price2sales: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      bottom_line: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      free_cash_flow: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      eps_growth_6_month: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      eps_growth_1_year: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      eps_growth_2_year: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: 'tickersdatagf',
      sequelize,
      timestamps: false,
    },
  );
  // TickersDataGFModel.belongsTo(AllTickersModel, {
  //   foreignKey: 'ticker_symbol'
  // });

  return TickersDataGFModel;
}
