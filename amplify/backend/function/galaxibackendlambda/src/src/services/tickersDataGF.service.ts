import { Op } from 'sequelize';
import { TickersDataGFModel } from '@/models/tickers-data-gf.model';
import DB from '@databases';
import { TickersData } from '@/interfaces/tickers-data.interface';

class TickersDataGFService {
  private TickersdataGF = DB.TickersDataGF;
  private Tickers = DB.Tickers;
  // private sort_order_list = ['asc', 'desc'];

  private commonResultFunction = async (sort_column: string, sort_order: string, limit: number=100) => {
    const latestDate = await this.TickersdataGF.findOne({
      order: [['date', 'desc']]
    });
    const tickersData = await this.TickersdataGF.findAll({
      limit: limit,
      include: [
        {
          model: this.Tickers,
        },
      ],
      where: {
        date: {
          [Op.eq]: latestDate.date as any,
        },
      },
      order: [[sort_column, sort_order]],
    });
    const result = tickersData.map((res: TickersDataGFModel) => {
      return {
        ticker_symbol: res.ticker_symbol,
        f_score: res.f_score,
        free_cash_flow_yield: res.free_cash_flow_yield,
        price_to_book: res.price_to_book,
        return_on_invested_capital: res.return_on_invested_capital,
        earning_yield: res.earning_yield,
        market_cap: res.market_cap,
        debt2equity: res.debt2equity,
        peg_ratio: res.peg_ratio,
        price2earning: res.price2earning,
        return_on_equity: res.return_on_equity,
        dividend_yield: res.dividend_yield,
        beta: res.beta,
        payout_ratio: res.payout_ratio,
        price2sales: res.price2sales,
        bottom_line: res.bottom_line,
        free_cash_flow: res.free_cash_flow,
        eps_growth_6_month: res.eps_growth_6_month,
        eps_growth_1_year: res.eps_growth_1_year,
        eps_growth_2_year: res.eps_growth_2_year,
        ticker_name: res.AllTickersModel.ticker_name,
        ticker_currency: res.AllTickersModel.ticker_currency,
        ticker_type: res.AllTickersModel.ticker_type,
        ticker_exchange_zone: res.AllTickersModel.ticker_exchange_zone,
        date: res.date,
      };
    });
    return result;
  }

  public async getAllTickersDataGF(pageNo:number = 1000): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('ticker_symbol', 'desc', pageNo);
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_fscore(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('f_score', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_fcfy(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('free_cash_flow_yield', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_pb(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('price_to_book', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_roic(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('return_on_invested_capital', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_ey(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('earning_yield', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_debt_to_equity(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('debt2equity', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_peg_ratio(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('peg_ratio', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_price_to_earning(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('price2earning', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_return_on_equity(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('return_on_equity', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_dividend_yield(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('dividend_yield', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_beta(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('beta', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_payout_ratio(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('payout_ratio', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_price_to_sales(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('price2sales', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_bottom_line(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('bottom_line', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_free_cash_flow(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('free_cash_flow', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_eps_growth_6_month(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('eps_growth_6_month', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_eps_growth_1_year(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('eps_growth_1_year', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  public async filter_by_eps_growth_2_year(): Promise<TickersData[]> {
    try{
      return await this.commonResultFunction('eps_growth_2_year', 'desc');
    } catch(error){
      throw new Error(error);
    }
  }

  // Unused And Need to change its response
  public async apply_all_filters(limit = 100): Promise<TickersData[]> {
    const tickersData = await this.TickersdataGF.findAll({
      limit: limit,
      order: [['ticker_symbol', 'asc']],
      include: [
        {
          model: this.Tickers,
        },
      ],
      where: {
        [Op.and]: [
          {
            f_score: {
              [Op.gte]: 6,
            },
          },
          {
            free_cash_flow_yield: {
              [Op.and]: [
                {
                  [Op.gte]: 7,
                },
                {
                  [Op.lte]: 10,
                },
              ],
            },
          },
          {
            price_to_book: {
              [Op.lte]: 3,
            },
          },
          {
            return_on_invested_capital: {
              [Op.gte]: 2,
            },
          },
          {
            earning_yield: {
              [Op.gte]: 7,
            },
          },
        ],
      },
    });
    return this.commonResultFunction('ticker_symbol', 'date');
  }
}

export default TickersDataGFService;
