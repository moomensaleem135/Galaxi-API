import { Request, Response } from 'express';
import { MsciResponse } from '@/interfaces/msci.interface';
import { MsciHistorical, FREQUENCY } from '@/interfaces/msci-historical.interface';
import MsciService from '@/services/msci.service';

class MsciController {
  private msciService = new MsciService();

  public get_monthly_data = async (req: Request, res: Response) => {
    try {
      const msciData: MsciResponse[] = await this.msciService.get_monthly_data();
      res.status(200).json({success: true, message: 'success', error: null, data: msciData });
    } catch (error) {
      console.log('Error in MsciController', error.messge);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: []});
    }
  };

  public get_weekly_data = async (req: Request, res: Response) => {
    try {
      const msciData: MsciResponse[] = await this.msciService.get_weekly_data();
      res.status(200).json({success: true, message: 'success', error: null, data: msciData });
    } catch (error) {
      console.log('Error in MsciController', error.messge);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: []});
    }
  };

  public get_daily_data = async (req: Request, res: Response) => {
    try {
      const msciData: MsciResponse[] = await this.msciService.get_daily_data();
      res.status(200).json({success: true, message: 'success', error: null, data: msciData });
    } catch (error) {
      console.log('Error in MsciController', error.messge);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: []});
    }
  };

  public get_historical_data = async (req: Request, res: Response) => {
    try {
      const {frequency} = req.body; 
      const msciData: MsciHistorical[] = await this.msciService.get_historical_data(frequency);
      res.status(200).json({success: true, message: 'success', error: null, data: msciData });
    } catch (error) {
      console.log('Error in MsciController', error.messge);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: []});
    }
  };

}

export default MsciController;
