import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import UserPurchasedStocksController from '@/controllers/userPurchasedStocks.controller';

class UserPurchasedStocksRoute implements Route {
  public path = '/userpurchasedstocks/';
  public router = Router();
  private userPurchasedStocksController = new UserPurchasedStocksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}getData`, this.userPurchasedStocksController.getUserPurchasedStocks);
    this.router.post(`${this.path}getSum`, this.userPurchasedStocksController.getSum);

  }
}

export default UserPurchasedStocksRoute;
