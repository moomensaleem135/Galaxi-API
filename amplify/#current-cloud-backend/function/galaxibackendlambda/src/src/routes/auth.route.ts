import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import isAdmin  from '@/middlewares/isAdmin.middleware';
import Route from '@interfaces/routes.interface';

class AuthRoute implements Route {
  public path = '/auth/';
  public router = Router();
  public authController = new AuthController();
  public server: string;
  public redirectUrl: string;
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}user/getAll`, isAdmin, this.authController.getAllUsers);
    this.router.post(`${this.path}user/getWeekly`, isAdmin, this.authController.getWeeklyUsers);
    this.router.post(`${this.path}user/getBalancestatus`, this.authController.getBalancestatus);
    this.router.get(`${this.path}user/delete`, this.authController.deleteUser);
    this.router.post(`${this.path}authenticate`, this.authController.getOrCreateUser);
    this.router.post(`${this.path}user/updateTerms`, this.authController.updateTerms );
    this.router.post(`${this.path}user/strategy`, this.authController.updateStrategy);

  }
}

export default AuthRoute;
