import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import MembershipsController from '@/controllers/membership.controller';

class MemborShipRoute implements Route {
  public path = '/memberships/';
  public router = Router();
  private membershipsController = new MembershipsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}all`, this.membershipsController.getAllMemberships);
    this.router.post(`${this.path}add`, this.membershipsController.addMembership);
    //this.router.post(`${this.path}update`, this.membershipsController.getAllMemberships);
    //this.router.post(`${this.path}delete`, this.membershipsController.getAllMemberships);
    //this.router.post(`${this.path}place`, this.membershipsController.getAllMemberships);
  }
}

export default MemborShipRoute;
