import { Request, Response } from 'express';
import StripePaymentService from '@services/stripePayment.service';

class PaymentController {
  public stripePaymentService: StripePaymentService;

  constructor() {
    this.stripePaymentService = new StripePaymentService();
  }

  public getBalance = async (req: Request, res: Response) => {
    try {
      const balance: any = await this.stripePaymentService.getBalance();
      res.status(200).json({ status: true, message: 'success', error: null, data: balance });
    } catch (error) {
      console.log("Error in Stripe Payment Contoller", error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public bankTransfer = async (req: Request, res: Response) => {
    try {
      const data: any = await this.stripePaymentService.bankTransfer(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data: data });
    } catch (error) {
      console.log("Error in Stripe Payment Contoller", error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public verifyAccountNumber = async (req: Request, res: Response) => {
    try {
      const url: any = await this.stripePaymentService.verifyAccountNumber(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data: url });
    } catch (error) {
      console.log("Error in Stripe Payment Contoller", error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public checkoutWithToken = async (req: Request, res: Response) => {
    try {
      const stripePyament = await this.stripePaymentService.stripeCheckout(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data: stripePyament });
    } catch (error) {
      console.log("Error in Stripe Payment Contoller", error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public checkoutMemberShipWithToken = async (req: Request, res: Response) => {
    try {
      const stripePyament = await this.stripePaymentService.checkoutMemberShipWithToken(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data: stripePyament });
    } catch (error) {
      console.log("Error in Stripe Payment Contoller", error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public createCheckoutSession = async (req: Request, res: Response) => {
    try {
      const url = await this.stripePaymentService.createCheckoutSession();
      res.redirect(303, url);
    } catch (error) {
      console.log("Error in Stripe Payment Contoller", error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public achTransfer = async (req: Request, res: Response) => {
    try {
      const data = await this.stripePaymentService.achTransfer(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data: data });
    } catch (error) {
      console.log("Error in Stripe Payment Contoller", error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public updateBkAccVerified = async (req: Request, res: Response) => {
    try {
      const data = await this.stripePaymentService.updateBkAccVerified(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data: data });
    } catch (error) {
      console.log("Error in Stripe Payment Contoller", error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };
}

export default PaymentController;
