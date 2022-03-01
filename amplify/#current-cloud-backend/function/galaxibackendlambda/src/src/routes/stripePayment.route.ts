import { Router } from 'express';
import StripePaymentController from '@controllers/stripePayment.controller';
import Route from '@interfaces/routes.interface';
import isAdmin from '@/middlewares/isAdmin.middleware';
import isBankAccVerified from '@/middlewares/isBankAccVerified.middleware';
import isHaveSettledCash from '@/middlewares/isHaveSettledCash.middleware';

class PaymentRoute implements Route {
  public path = '/stripePayment/';
  public router = Router();
  public stripePaymentController = new StripePaymentController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}test`, (req, res) => res.status(200).json({ message: 'Stripe payment testing' }));
    // app.post('/create-checkout-session', async (req, res) => {

    this.router.post(`${this.path}create-checkout-session`, this.stripePaymentController.createCheckoutSession);
    this.router.post(`${this.path}checkoutWithToken`, this.stripePaymentController.checkoutWithToken);
    this.router.post(`${this.path}checkoutMemberShipWithToken`, this.stripePaymentController.checkoutMemberShipWithToken);
    this.router.post(`${this.path}verifyAccountNumber`, this.stripePaymentController.verifyAccountNumber);
    this.router.post(`${this.path}updateBkAccVerified`, this.stripePaymentController.updateBkAccVerified);
    this.router.post(`${this.path}bankTransfer`, isBankAccVerified, isHaveSettledCash, this.stripePaymentController.bankTransfer);
    this.router.get(`${this.path}getBalance`, this.stripePaymentController.getBalance);
    this.router.post(`${this.path}achTransfer`, this.stripePaymentController.achTransfer);
  }
}

export default PaymentRoute;
