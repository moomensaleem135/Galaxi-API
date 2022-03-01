import { Request, Response } from 'express';
import PurchaseService from '@/services/purchase.service';
import { Purchase, defaultPurchaseRequest } from '@/interfaces/purchases.interface';

class PurchaseController {
  private purchaseService = new PurchaseService();

  public getAllpurchases = async (req: Request, res: Response) => {
    const { offset, size, sortField, sortType } = req.body;
    try {
      const purchasesData: Purchase[] = await this.purchaseService.getAllPurchase({
        offset: offset ?? defaultPurchaseRequest.offset,
        size: size ?? defaultPurchaseRequest.size,
        sortField: sortField ?? defaultPurchaseRequest.sortField,
        sortType: sortType ?? defaultPurchaseRequest.sortType,
      });
      const count = await this.purchaseService.getAllPurchaseCount();
      res.status(200).json({ status: true, message: 'success', error: null, data: purchasesData, count: count });
    } catch (error) {
      console.log('Error in Purchases Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  
  public getWeeklypurchases = async (req: Request, res: Response) => {
    try {
      const purchasesData = await this.purchaseService.getWeeklyPurchase();
      res.status(200).json({ status: true, message: 'success', error: null, data: purchasesData });
    } catch (error) {
      console.log('Error in Purchases controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

}

export default PurchaseController;
