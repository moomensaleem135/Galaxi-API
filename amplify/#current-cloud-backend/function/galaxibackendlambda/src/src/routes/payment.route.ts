import { Router } from 'express';
import PaymentController from '@controllers/payment.controller';
import Route from '@interfaces/routes.interface';
import { Checkout } from 'checkout-sdk-node';
import isAdmin  from '@/middlewares/isAdmin.middleware';

class PaymentRoute implements Route {
  public path = '/payment/'; 
  public router = Router();
  public paymentController = new PaymentController();
  public cko: Checkout;
  constructor() {
    this.initializeRoutes();
    this.cko = new Checkout(process.env.CHEKOUT_SECRET_KEY);

  }

  private initializeRoutes() {
    this.router.get(`${this.path}test`, (req, res) => res.status(200).json({ message: 'payment testing'}));

    this.router.post(`${this.path}checkout`, this.paymentController.paymentCheckout);
    this.router.post(`${this.path}checkoutMembership`, this.paymentController.paymentCheckoutMembership);
    this.router.post(`${this.path}cancelMembership`, this.paymentController.removeCheckoutMembership);
    this.router.get(`${this.path}getDetails`, this.paymentController.getDetails); //Get payment details
    this.router.get(`${this.path}getActions`, this.paymentController.getActions); //Get payment Actions
    this.router.post(`${this.path}capture`, this.paymentController.capture); //capture payment 
    this.router.post(`${this.path}refund`, this.paymentController.refund); //refund payment 
    this.router.post(`${this.path}getAll`, isAdmin, this.paymentController.getAllPayments);
    this.router.post(`${this.path}getWeekly`, isAdmin, this.paymentController.getWeeklyPayments);
    this.router.post(`${this.path}getUserPaymentsHistory`, this.paymentController.getUserPaymentsHistory);
  }
}

export default PaymentRoute;
