import { Request, Response } from 'express';
import TickersDataYFService from '@/services/tickersDataYF.service';
import { TickersDataYfResponseModelExtended } from '@/models/tickers-data-yf.model';

class TickersDataYFController {
  private tickersDataYFService = new TickersDataYFService();

  public get_all_data = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.getAllTickersDataYF(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_fscore = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_fscore(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_fcfy = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_fcfy(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_pb = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_pb(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_roic = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_roic(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_ey = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_ey(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_debt_to_equity = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_debt_to_equity(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_peg_ratio = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_peg_ratio(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_return_on_equity = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_return_on_equity(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_dividend_yield = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_dividend_yield(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_beta = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_beta(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_payout_ratio = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_payout_ratio(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_price_to_sales = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_price_to_sales(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_price_to_earning = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_price_to_earning(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_bottom_line = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_bottom_line(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_free_cash_flow = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_free_cash_flow(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_eps_growth_6_month = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_eps_growth_6_month(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_eps_growth_1_year = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_eps_growth_1_year(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_eps_growth_2_year = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_eps_growth_2_year(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  }; 
  
  public filter_by_retained_earnings = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_retained_earnings(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_cash_on_hand = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_cash_on_hand(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public apply_all_filters = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.apply_all_filters(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };

  public filter_by_free_cash_flow_to_equity = async (req: Request, res: Response) => {
    try {
      const { limit, offset, googleId } = req.body;
      const tickersDataYF: TickersDataYfResponseModelExtended = await this.tickersDataYFService.filter_by_free_cash_flow_to_equity(limit, offset, googleId);
      res.status(200).json({success: true,  message: 'success', error: null, data: tickersDataYF });
    } catch (error) {
     console.log("Error in Tickers Data Yf Controller", error.message);
      res.status(400).json({success: false,  message: 'failed', error: error.message, data: {}});
    }
  };
}

export default TickersDataYFController;
