import { Op } from 'sequelize';
import { TickersDataYFModel, TickersDataYfResponseModelExtended } from '@/models/tickers-data-yf.model';
import DB from '@databases';

class TickersDataYFService {
  private TickersdataYF = DB.TickersDataYF;
  private Tickers = DB.Tickers;
  private Users = DB.Users;

  private commonResultFunction = async (
    sort_column: string,
    sort_order: string,
    limit: number,
    offset: number,
    googleId: string,
  ): Promise<TickersDataYfResponseModelExtended> => {
    let shouldAddFiveYearsData = false;
    const latestDate = await this.TickersdataYF.findOne({
      order: [['date', 'desc']],
    });
    const user = await this.Users.findOne({
      where: {
        googleId,
      },
    });
    if (user && user.roleType === 'Admin') {
      shouldAddFiveYearsData = true;
    }
    let tickersData;
    let count;
    if (sort_column === 'beta') {
      const data = await this.TickersdataYF.findAndCountAll({
        limit: limit,
        include: [
          {
            model: this.Tickers,
          },
        ],
        where: {
          [Op.and]: [
            {
              date: {
                [Op.eq]: latestDate.date as any,
              },
            },
            {
              beta: {
                [Op.between]: [0, 1]
              }
            },
          ],
        },
        order: [[sort_column, sort_order]],
        offset: offset,
      });
      tickersData = data.rows;
      count = data.count;
    } else {
      const data = await this.TickersdataYF.findAndCountAll({
        limit: limit,
        include: [
          {
            model: this.Tickers,
          },
        ],
        where: {
          [Op.and]: [
            {
              date: {
                [Op.eq]: latestDate.date as any,
              },
            },
            {
              [sort_column]: {
                [Op.ne]: null,
              },
            },
          ],
        },
        order: [[sort_column, sort_order]],
        offset: offset,
      });
      tickersData = data.rows;
      count = data.count;
    }

    const result = tickersData.map((res: TickersDataYFModel) => {
      const resp = {
        ticker_symbol: res.ticker_symbol,
        ticker_name: res.AllTickersModel.ticker_name,
        ticker_currency: res.AllTickersModel.ticker_currency,
        ticker_type: res.AllTickersModel.ticker_type,
        ticker_exchange_zone: res.AllTickersModel.ticker_exchange_zone,
        date: res.date,
        [sort_column]: res[sort_column],
      };
      if (shouldAddFiveYearsData) {
        delete resp[sort_column];
        resp['five_years_data'] = res.five_years_data;
        resp['all_data'] = res.all_data;
        resp['f_score'] = res.f_score;
        resp['free_cash_flow_yield'] = res.free_cash_flow_yield;
        resp['price_to_book'] = res.price_to_book;
        resp['return_on_invested_capital'] = res.return_on_invested_capital;
        resp['earning_yield'] = res.earning_yield;
        resp['change_in_retained_earnings'] = res.change_in_retained_earnings;
        resp['market_cap'] = res.market_cap;
        resp['increase_in_price_over_six_month'] = res.increase_in_price_over_six_months;
        resp['cash_on_hand'] = res.cash_on_hand;
        resp['debt2equity'] = res.debt2equity;
        resp['peg_ratio'] = res.peg_ratio;
        resp['price2earning'] = res.price2earning;
        resp['return_on_equity'] = res.return_on_equity;
        resp['dividend_yield'] = res.dividend_yield;
        resp['beta'] = res.beta;
        resp['payout_ratio'] = res.payout_ratio;
        resp['price2sales'] = res.price2sales;
        resp['bottom_line'] = res.bottom_line;
        resp['free_cash_flow'] = res.free_cash_flow;
        resp['eps_growth_6_month'] = res.eps_growth_6_month;
        resp['eps_growth_1_year'] = res.eps_growth_1_year;
        resp['eps_growth_2_year'] = res.eps_growth_2_year;
        resp['net_operating_assets'] = res.net_operating_assets;
        resp['change_in_debt'] = res.change_in_debt;
        resp['ebitda_to_ev'] = res.ebitda_to_ev;
        resp['shareholder_yield'] = res.shareholder_yield;
        resp['eps_growth_3_year'] = res.eps_growth_3_year;
        resp['roe_growth_3_year'] = res.roe_growth_3_year;
        resp['sales_growth_3_year'] = res.sales_growth_3_year;
        resp['price_to_cash_flow'] = res.price_to_cash_flow;
        resp['five_years_data'] = res.five_years_data;
        resp['free_cash_flow_to_equity'] = res.free_cash_flow_to_equity;
      }
      return resp;
    });
    return { result, count };
  };

  public async getAllTickersDataYF(limit: number, offset: number, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    const latestDate = await this.TickersdataYF.findOne({
      order: [['date', 'desc']],
    });
    const { count, rows: tickersData } = await this.TickersdataYF.findAndCountAll({
      limit: limit,
      include: [
        {
          model: this.Tickers,
        },
      ],
      where: {
        [Op.and]: [
          {
            date: {
              [Op.eq]: latestDate.date as any,
            },
          },
          {
            ['ticker_symbol']: {
              [Op.ne]: null,
            },
          },
        ],
      },
      order: [['ticker_symbol', 'asc']],
      offset: offset,
    });
    const result = tickersData.map((res: TickersDataYFModel) => {
      return {
        ticker_name: res.AllTickersModel.ticker_name,
        ticker_currency: res.AllTickersModel.ticker_currency,
        ticker_type: res.AllTickersModel.ticker_type,
        ticker_exchange_zone: res.AllTickersModel.ticker_exchange_zone,
        ticker_symbol: res.ticker_symbol,
        f_score: res.f_score,
        price_to_book: res.price_to_book,
        date: res.date,
      };
    });
    return { result, count };
  }

  public async filter_by_fscore(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('f_score', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_fcfy(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('free_cash_flow_yield', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_pb(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('price_to_book', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_roic(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('return_on_invested_capital', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_ey(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('earning_yield', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_debt_to_equity(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('debt2equity', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_peg_ratio(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('peg_ratio', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_price_to_earning(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('price2earning', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_return_on_equity(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('return_on_equity', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_dividend_yield(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('dividend_yield', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_beta(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('beta', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_payout_ratio(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('payout_ratio', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_price_to_sales(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('price2sales', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_bottom_line(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('bottom_line', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_free_cash_flow(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('free_cash_flow', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_eps_growth_6_month(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('eps_growth_6_month', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_eps_growth_1_year(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('eps_growth_1_year', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_eps_growth_2_year(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('eps_growth_2_year', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_retained_earnings(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('change_in_retained_earnings', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_cash_on_hand(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('cash_on_hand', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  public async filter_by_free_cash_flow_to_equity(
    limit: number = 20,
    offset: number = 1,
    googleId: string,
  ): Promise<TickersDataYfResponseModelExtended> {
    try {
      return await this.commonResultFunction('free_cash_flow_to_equity', 'desc', limit, offset, googleId);
    } catch (err) {
      console.log('Error in ticker data yf service', err);
      throw new Error(err);
    }
  }

  // Unused And Need to change its response
  public async apply_all_filters(limit: number = 20, offset: number = 1, googleId: string): Promise<TickersDataYfResponseModelExtended> {
    const tickersData = await this.TickersdataYF.findAll({
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
    return this.commonResultFunction('ticker_symbol', 'date', limit, offset, googleId);
  }
}

export default TickersDataYFService;
