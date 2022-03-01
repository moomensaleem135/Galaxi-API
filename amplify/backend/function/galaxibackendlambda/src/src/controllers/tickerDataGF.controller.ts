import { Request, Response } from 'express';
import TickersDataGFService from '@/services/tickersDataGF.service';
import { TickersData } from '@/interfaces/tickers-data.interface';

class TickersDataGFController {
  private tickersDataGFService = new TickersDataGFService();

  public get_all_data = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.getAllTickersDataGF(req.body.pageNo);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_fscore = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_fscore();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_fcfy = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_fcfy();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_pb = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_pb();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_roic = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_roic();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_ey = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_ey();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_debt_to_equity = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_debt_to_equity();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_peg_ratio = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_peg_ratio();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_return_on_equity = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_return_on_equity();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_dividend_yield = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_dividend_yield();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_beta = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_beta();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_payout_ratio = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_payout_ratio();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_price_to_sales = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_price_to_sales();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_price_to_earning = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_price_to_earning();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_bottom_line = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_bottom_line();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_free_cash_flow = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_free_cash_flow();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_eps_growth_6_month = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_eps_growth_6_month();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_eps_growth_1_year = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_eps_growth_1_year();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_eps_growth_2_year = async (req: Request, res: Response) => {
    try {
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.filter_by_eps_growth_2_year();
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public apply_all_filters = async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit as unknown as number;
      const tickersDataGF: TickersData[] = await this.tickersDataGFService.apply_all_filters(limit);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataGF });
    } catch (error) {
      console.log("Error in Tickers Data Gf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };
}

export default TickersDataGFController;
