import { Request, Response } from 'express';
import OrderService from '@/services/order.service';
import { Orders, defaultOrderRequest } from '@/interfaces/orders.interface';

class OrderController {
  private orderService = new OrderService();

  public getAllOrders = async (req: Request, res: Response) => {
    const { offset, size, sortField, sortType } = req.body;
    try {
      const ordersData: Orders[] = await this.orderService.getAllOrders({
        offset: offset ?? defaultOrderRequest.offset,
        size: size ?? defaultOrderRequest.size,
        sortField: sortField ?? defaultOrderRequest.sortField,
        sortType: sortType ?? defaultOrderRequest.sortType,
      });
      const count = await this.orderService.getAllOrdersCount();
      res.status(200).json({ status: true, message: 'success', error: null, data: ordersData, count: count });
    } catch (error) {
      console.log('Error in OrderController', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  
  public getWeeklyOrders = async (req: Request, res: Response) => {
    try {
      const ordersData = await this.orderService.getWeeklyOrders();
      res.status(200).json({ status: true, message: 'success', error: null, data: ordersData });
    } catch (error) {
      console.log('Error in OrderController', error);
      res.status(400).json({ success: false, message: 'failed', error: error, data: {} });
    }
  };

  public getUserOrders = async (req: Request, res: Response) => {
    try {
      const userOrdersData = await this.orderService.getUserOrders(req.body.googleId);
      res.status(200).json({ status: true, message: 'success', error: null, data: userOrdersData });
    } catch (error) {
      console.log('Error in OrderController', error);
      res.status(400).json({ success: false, message: 'failed', error: error, data: {} });
    }
  };

}

export default OrderController;
