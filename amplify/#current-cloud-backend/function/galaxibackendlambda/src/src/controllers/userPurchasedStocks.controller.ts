import { Request, Response } from 'express';
import UserPurchasedStocksService from '@/services/userPurchasedStocks.service';


class UserPurchasedStocksController {
  private userPurchasedStocksService = new UserPurchasedStocksService();

  public getUserPurchasedStocks = async (req: Request, res: Response) => {
    try {
      const userPurchasedStocksData = await this.userPurchasedStocksService.getUserPurchasedStocks(req.body.googleId);
      res.status(200).json({ status: true, message: 'success', error: null, data: userPurchasedStocksData });
    } catch (error) {
      console.log('Error in UserPurchasedStocksData Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public getSum = async (req: Request, res: Response) => {
    try {
      const sumData = await this.userPurchasedStocksService.getSum(req.body.googleId);
      res.status(200).json({ status: true, message: 'success', error: null, data: sumData });
    } catch (error) {
      console.log('Error in UserPurchasedStocksData controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.mesage, data: {} });
    }
  };
}

export default UserPurchasedStocksController;
