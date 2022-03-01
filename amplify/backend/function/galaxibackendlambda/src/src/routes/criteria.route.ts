import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import CriteriasController from '@/controllers/criteria.controller';
import isAdmin  from '@/middlewares/isAdmin.middleware';

class CriteriaRoute implements Route {
  public path = '/criterias/';
  public router = Router();
  private criteriaController = new CriteriasController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}all`, isAdmin, this.criteriaController.apply_all_criterias);
    this.router.post(`${this.path}retainedearnings`, isAdmin, this.criteriaController.filterByRetained);
  }
}

export default CriteriaRoute;
