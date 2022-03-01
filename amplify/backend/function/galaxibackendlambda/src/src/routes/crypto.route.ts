import { Router } from 'express';
import CryptoController from '@controllers/crypto.controller';
import isUser  from '@/middlewares/isUser.middleware';
import Route from '@interfaces/routes.interface';

class CryptoRoute implements Route {
  public path = '/crypto/';
  public router = Router();
  public cryptoController = new CryptoController();
  public server: string;
  public redirectUrl: string;
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}get/All`, isUser, this.cryptoController.getAllCryptos);
    this.router.post(`${this.path}scheduled`, isUser, this.cryptoController.scheduled);
    this.router.post(`${this.path}updateScheduled`, isUser, this.cryptoController.updateScheduled);
  }
}

export default CryptoRoute;
