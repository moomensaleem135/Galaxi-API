import DB from '@databases';
import { AllCriteriaTickersData, AllCriterias } from '@/interfaces/all-criterias-tickers-data.interface';
import { Op } from 'sequelize/types';

class CriteriaService {
  private sort_order_list = ['asc', 'desc'];
  private tickersModelGf = DB.TickersDataGF;
  private tickersModelYf = DB.TickersDataYF;
  private sort_by_list = [
    'ticker_symbol_gf',
    'f_score_gf',
    'free_cash_flow_yield_gf',
    'price_to_book_gf',
    'return_on_invested_capital_gf',
    'earning_yield_gf',
    'market_cap_gf',
    'ticker_symbol_yf',
    'f_score_yf',
    'free_cash_flow_yield_yf',
    'price_to_book_yf',
    'return_on_invested_capital_yf',
    'earning_yield_yf',
    'market_cap_yf',
    'increase_in_price_over_six_months_yf',
    'change_in_retained_earnings_yf',
    'cash_on_hand_yf',
    'ticker_gf_name',
  ];

  public async apply_all_criterias(query_dict: any): Promise<AllCriteriaTickersData[]> {
    try {
      const limit = query_dict.limit ? query_dict.limit : 10;
      let sort_by = query_dict.sort_by;
      let sort_order = query_dict.sort_order;
      if (this.sort_by_list.includes(sort_by) == false) {
        sort_by = 'ticker_symbol_gf';
      } 
      if (this.sort_order_list.includes(sort_order) == false) {
        sort_order = 'asc';
      }
      const f_score_gf = query_dict.f_score_gf ? Number(query_dict.f_score_gf) : 6;
      const fcfy_gf = query_dict.free_cash_flow_yield_gf ? Number(query_dict.free_cash_flow_yield_gf) : 7;
      const pb_gf = query_dict.price_to_book_gf ? Number(query_dict.price_to_book_gf) : 3;
      const roic_gf = query_dict.return_on_invested_capital_gf ? Number(query_dict.return_on_invested_capital_gf) : 2;
      const ey_gf = query_dict.earning_yield_gf ? Number(query_dict.earning_yield_gf) : 7;
      const f_score_yf = query_dict.f_score_yf ? Number(query_dict.f_score_yf) : 6;
      const fcfy_yf = query_dict.free_cash_flow_yield_yf ? Number(query_dict.free_cash_flow_yield_yf) : 7;
      const pb_yf = query_dict.price_to_book_yf ? Number(query_dict.price_to_book_yf) : 3;
      // const roic_yf = query_dict.return_on_invested_capital_yf ? Number(query_dict.return_on_invested_capital_yf) : 2;
      const ey_yf = query_dict.earning_yield_yf ? Number(query_dict.earning_yield_yf) : 7;
      // gf.f_score_gf>=${f_score_gf} and gf.free_cash_flow_yield_gf>=${fcfy_gf} and gf.price_to_book_gf<=${pb_gf} and gf.return_on_invested_capital_gf>=${roic_gf} and gf.earning_yield_gf>=${ey_gf} and
      // and yf.price_to_book_yf<=${pb_yf} and yf.return_on_invested_capital_yf>=${roic_yf} and yf.earning_yield_yf>=${ey_yf}
      const qgf =
        'SELECT tgf.ticker_symbol as ticker_symbol_gf, tgf.f_score as f_score_gf, tgf.free_cash_flow_yield as free_cash_flow_yield_gf, tgf.price_to_book as price_to_book_gf, tgf.return_on_invested_capital as return_on_invested_capital_gf, tgf.earning_yield as earning_yield_gf, tgf.market_cap as market_cap_gf, lower(tkg.ticker_name) as ticker_gf_name, date, tkg.ticker_type, tkg.ticker_exchange_zone, FROM tickersdatagf tgf join tickers tkg on tkg.ticker_symbol=tgf.ticker_symbol';
      const qyf =
        'SELECT tyf.ticker_symbol as ticker_symbol_yf, tyf.f_score as f_score_yf, tyf.free_cash_flow_yield as free_cash_flow_yield_yf, tyf.price_to_book as price_to_book_yf, tyf.earning_yield as earning_yield_yf, tyf.return_on_invested_capital as return_on_invested_capital_yf, tyf.market_cap as market_cap_yf, tyf.increase_in_price_over_six_months as price_change_over_six_months_yf, tyf.change_in_retained_earnings as change_in_retained_earnings_yf, tyf.cash_on_hand as cash_on_hand_yf, lower(tkf.ticker_name) as ticker_yf_name, tkf.ticker_type, tkf.ticker_exchange_zone FROM tickersdatayf tyf join tickers tkf on tkf.ticker_symbol=tyf.ticker_symbol';
      const query = `SELECT * FROM (${qgf}) as gf join (${qyf}) as yf on gf.ticker_gf_name=yf.ticker_yf_name where (gf.f_score_gf>=${f_score_gf} and gf.free_cash_flow_yield_gf>=${fcfy_gf} and gf.price_to_book_gf<=${pb_gf} and gf.return_on_invested_capital_gf>=${roic_gf} and gf.earning_yield_gf>=${ey_gf} and yf.f_score_yf>=${f_score_yf} and yf.free_cash_flow_yield_yf>=${fcfy_yf} and yf.price_to_book_yf<=${pb_yf} and yf.price_change_over_six_months_yf!=0 and yf.earning_yield_yf>=${ey_yf} ) order by ${sort_by} ${sort_order} limit ${limit}`;
      return (await DB.sequelize.query(query))[0] as AllCriteriaTickersData[];
    } catch (error) {
      throw new Error(error);
    }
    
  }

  public async filterByRetained(query_dict: any): Promise<AllCriteriaTickersData[]> {
    try {
      const date = await DB.TickersDataYF.findOne({
        order: [['date', 'desc']],
      });
      
      const limit = query_dict.limit ? query_dict.limit : 100;
      let sort_by = 'change_in_retained_earnings_yf';
      let sort_order = query_dict.sort_order;
      if (this.sort_by_list.includes(sort_by) == false) {
        sort_by = 'ticker_symbol_gf';
      }
      if (this.sort_order_list.includes(sort_order) == false) {
        sort_order = 'desc';
      }
      const qgf =
        'Select tgf.ticker_symbol as ticker_symbol_gf, tgf.f_score as f_score_gf, tgf.free_cash_flow_yield as free_cash_flow_yield_gf, tgf.price_to_book as price_to_book_gf, tgf.return_on_invested_capital as return_on_invested_capital_gf, tgf.earning_yield as earning_yield_gf, tgf.market_cap as market_cap_gf, tgf.date as date_gf, lower(tkg.ticker_name) as ticker_gf_name, tkg.ticker_type, tkg.ticker_exchange_zone FROM tickersdatagf tgf join tickers tkg on tkg.ticker_symbol=tgf.ticker_symbol';
      const qyf =
        'Select tyf.ticker_symbol as ticker_symbol_yf, tyf.f_score as f_score_yf, tyf.free_cash_flow_yield as free_cash_flow_yield_yf, tyf.price_to_book as price_to_book_yf, tyf.return_on_invested_capital as return_on_invested_capital_yf, tyf.earning_yield as earning_yield_yf, tyf.market_cap as market_cap_yf, tyf.increase_in_price_over_six_months as increase_in_price_over_six_months_yf, tyf.change_in_retained_earnings as change_in_retained_earnings_yf, tyf.cash_on_hand as cash_on_hand_yf, lower(tkf.ticker_name) as ticker_yf_name, tkf.ticker_type, tkf.ticker_exchange_zone FROM tickersdatayf tyf join tickers tkf on tkf.ticker_symbol=tyf.ticker_symbol';
      const query = `Select * FROM (${qgf}) as gf join (${qyf}) as yf on gf.ticker_gf_name=yf.ticker_yf_name where gf.date_gf>='${date.date.toString()}'::date order by ${sort_by} ${sort_order} limit 100`;
  
      return (await DB.sequelize.query(query))[0] as AllCriteriaTickersData[];
    } catch (error) {
      throw new Error(error);
    }
    
  }
}

export default CriteriaService;
