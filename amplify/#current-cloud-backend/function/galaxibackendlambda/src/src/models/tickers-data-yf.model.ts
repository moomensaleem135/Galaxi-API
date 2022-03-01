import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { TickersDataYF } from '@/interfaces/tickers-data-yf.interface';
import { AllTickersModel } from './all-tickers.model';

export type TickerDataYfCreationAtrributes = Optional<
TickersDataYF,
  | 'ticker_symbol'
  | 'f_score'
  | 'free_cash_flow_yield'
  | 'price_to_book'
  | 'increase_in_price_over_six_months'
  | 'return_on_invested_capital'
  | 'earning_yield'
  | 'change_in_retained_earnings'
  | 'market_cap'
  | 'cash_on_hand'
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
  | 'five_years_data'
  | 'all_data'
  | 'net_operating_assets'
  | 'change_in_debt'
  | 'ebitda_to_ev'
  | 'shareholder_yield'
  | 'eps_growth_3_year'
  | 'roe_growth_3_year'
  | 'sales_growth_3_year'
  | 'price_to_cash_flow'
>;

export const TickerDataYfSortAtrributes = [
  'ticker_symbol',
  'f_score',
  'free_cash_flow_yield',
  'price_to_book',
  'increase_in_price_over_six_months',
  'return_on_invested_capital',
  'change_in_retained_earnings',
  'earning_yield',
  'market_cap',
  'cash_on_hand',
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
  'five_years_data',
  'all_data',
  'net_operating_assets',
  'change_in_debt',
  'ebitda_to_ev',
  'shareholder_yield',
  'eps_growth_3_year',
  'roe_growth_3_year',
  'sales_growth_3_year',
  'price_to_cash_flow'

];

export interface TickersDataYfResponseModel {
  ticker_symbol: string;
  ticker_name: string;
  ticker_currency: string;
  ticker_exchange_zone: string;
  f_score?: Number;
  free_cash_flow_yield?: Number;
  price_to_book?: Number;
  increase_in_price_over_six_months?: Number;
  return_on_invested_capital?: Number;
  earning_yield?: Number;
  change_in_retained_earnings?: Number;
  market_cap?: Number;
  cash_on_hand?: Number;
  date: Date;
  debt2equity?: Number;
  peg_ratio?: Number;
  price2earning?: Number;
  return_on_equity?: Number;
  dividend_yield?: Number;
  beta?: Number;
  payout_ratio?: Number;
  price2sales?: Number;
  bottom_line?: Number;
  free_cash_flow?: Number;
  eps_growth_6_month?: Number;
  eps_growth_1_year?: Number;
  eps_growth_2_year?: Number;
  five_years_data?: string;
  all_data?: string;
  net_operating_assets?: Number;
  change_in_debt?: Number;
  ebitda_to_ev?: Number;
  shareholder_yield?: Number;
  eps_growth_3_year?: Number;
  roe_growth_3_year?: Number;
  sales_growth_3_year?: Number;
  price_to_cash_flow?: Number;
  free_cash_flow_to_equity?: Number;
}

export interface TickersDataYfResponseModelExtended {
  result: TickersDataYfResponseModel[],
  count: number;
}

export class TickersDataYFModel extends Model<TickersDataYF, TickerDataYfCreationAtrributes> implements TickersDataYF {
  ticker_symbol: string;
  f_score: Number;
  free_cash_flow_yield: Number;
  price_to_book: Number;
  increase_in_price_over_six_months: Number;
  return_on_invested_capital: Number;
  earning_yield: Number;
  change_in_retained_earnings: Number;
  market_cap: Number;
  cash_on_hand: Number;
  date: Date;
  debt2equity: Number;
  peg_ratio: Number;
  price2earning: Number;
  return_on_equity: Number;
  dividend_yield: Number;
  beta: Number;
  payout_ratio: Number;
  price2sales: Number;
  bottom_line: Number;
  free_cash_flow: Number;
  eps_growth_6_month: Number;
  eps_growth_1_year: Number;
  eps_growth_2_year: Number;
  five_years_data: string;
  all_data: string;
  net_operating_assets: Number;
  change_in_debt: Number;
  ebitda_to_ev: Number;
  shareholder_yield: Number;
  eps_growth_3_year: Number;
  roe_growth_3_year: Number;
  sales_growth_3_year: Number;
  price_to_cash_flow: Number;
  free_cash_flow_to_equity: Number;
  AllTickersModel: AllTickersModel
}

export default function (sequelize: Sequelize): typeof TickersDataYFModel {
  TickersDataYFModel.init(
    {
      ticker_symbol: {
        primaryKey: true,
        type: DataTypes.STRING(250),
      },
      f_score: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      free_cash_flow_yield: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      increase_in_price_over_six_months: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      price_to_book: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      return_on_invested_capital: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      earning_yield: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      change_in_retained_earnings: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      market_cap: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      cash_on_hand: {
        allowNull: true,
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
      five_years_data: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      all_data: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      net_operating_assets:{
        allowNull: true,
        type: DataTypes.FLOAT
      },
      ebitda_to_ev:{
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      shareholder_yield: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      eps_growth_3_year: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      roe_growth_3_year: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      sales_growth_3_year: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      change_in_debt:{
        allowNull: true,
        type: DataTypes.FLOAT
      },
      price_to_cash_flow:{
        allowNull: true,
        type: DataTypes.FLOAT
      },
      free_cash_flow_to_equity:{
        allowNull: true,
        type: DataTypes.FLOAT
      }
    },
    {
      tableName: 'tickersdatayf',
      sequelize,
      timestamps: false,
    },
  );
  // TickersDataGFModel.belongsTo(AllTickersModel, {
  //   foreignKey: 'ticker_symbol'
  // });

  return TickersDataYFModel;
}
