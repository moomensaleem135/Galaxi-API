import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import PurchaseController from '@/controllers/purchase.controller';
import isAdmin  from '@/middlewares/isAdmin.middleware';

class PurchaseRoute implements Route {
  public path = '/purchase/';
  public router = Router();
  private purchaseController = new PurchaseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}getAll`, isAdmin, this.purchaseController.getAllpurchases);
    this.router.post(`${this.path}getWeekly`, isAdmin, this.purchaseController.getWeeklypurchases);


  }
}

export default PurchaseRoute;
