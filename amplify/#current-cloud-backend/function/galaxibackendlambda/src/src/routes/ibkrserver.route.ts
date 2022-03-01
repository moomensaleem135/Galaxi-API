import { Router } from 'express';
import IbkrServerController from '@controllers/ibkrserver.controller';
import Route from '@interfaces/routes.interface';

class IbkrServerRoute implements Route {
  public path = '/ibkr/server/';
  public router = Router();
  public ibkrServerController = new IbkrServerController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}create`, this.ibkrServerController.createIbkrServer);
  }
}

export default IbkrServerRoute;
