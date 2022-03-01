import { Request, Response } from 'express';
import { defaultPaymentRequest, Payment } from '@interfaces/payment.interface';
import PaymentService from '@services/payment.service';

class PaymentController {
  private paymentService = new PaymentService();

  public paymentCheckout = async (req: Request, res: Response) => {
    try {
      const data: any = await this.paymentService.paymentCheckout(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data: data });
    } catch (error) {
      console.log('Error in Payment Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public paymentCheckoutMembership = async (req: Request, res: Response) => {
    try {
      const data: any = await this.paymentService.paymentCheckoutMembership(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data: data });
    } catch (error) {
      console.log('Error in Payment Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public removeCheckoutMembership = async (req: Request, res: Response) => {
    try {
      const data: any = await this.paymentService.removeCheckoutMemberShip(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data: data });
    } catch (error) {
      console.log('Error in Payment Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };


  public getDetails = async (req: Request, res: Response) => {
    try {
      const data: any = await this.paymentService.getDetails(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data: data });
    } catch (error) {
      console.log('Error in Payment Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public getActions = async (req: Request, res: Response) => {
    try {
      const data: any = await this.paymentService.getActions(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data: data });
    } catch (error) {
      console.log('Error in Payment Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };


  public capture = async (req: Request, res: Response) => {
    try {
      const data: any = await this.paymentService.capturePayment(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data: data });
    } catch (error) {
      console.log('Error in Payment Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public refund = async (req: Request, res: Response) => {
    try {
      const data: any = await this.paymentService.refundPayment(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data: data });
    } catch (error) {
      console.log('Error in Payment Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public getAllPayments = async (req: Request, res: Response) => {
    const { offset, size, sortField, sortType } = req.body;
    try {
      const paymentData: Payment[] = await this.paymentService.getAllPayment({
        offset: offset ?? defaultPaymentRequest.offset,
        size: size ?? defaultPaymentRequest.size,
        sortField: sortField ?? defaultPaymentRequest.sortField,
        sortType: sortType ?? defaultPaymentRequest.sortType,
      });
      const count = await this.paymentService.getAllPaymentCount();
      res.status(200).json({ status: true, message: 'success', error: null, data: paymentData, count: count });
    } catch (error) {
      console.log('Error in Payment Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public getWeeklyPayments = async (req: Request, res: Response) => {
    try {
      const paymentsData = await this.paymentService.getWeeklyPayment();
      res.status(200).json({ status: true, message: 'success', error: null, data: paymentsData });
    } catch (error) {
      console.log('Error in Payment Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public getUserPaymentsHistory = async (req: Request, res: Response) => {
    try {
      const userPayments = await this.paymentService.getUserPaymentsHistory(req.body.googleId);
      res.status(200).json({ status: true, message: 'success', error: null, data: userPayments });
    } catch (error) {
      console.log('Error in Payment Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };
}

export default PaymentController;
