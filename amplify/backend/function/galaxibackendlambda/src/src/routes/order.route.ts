import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import OrderController from '@/controllers/order.controller';
import isAdmin  from '@/middlewares/isAdmin.middleware';

class OrderRoute implements Route {
  public path = '/orders/';
  public router = Router();
  private orderController = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}getAll`, isAdmin, this.orderController.getAllOrders);
    this.router.post(`${this.path}getWeekly`, isAdmin, this.orderController.getWeeklyOrders);
    this.router.post(`${this.path}getUserOrders`, this.orderController.getUserOrders);
  }
}

export default OrderRoute;
