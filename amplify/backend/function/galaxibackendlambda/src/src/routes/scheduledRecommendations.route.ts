import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import ScheduledRecommendationsController from '@/controllers/scheduleRecommendations.controller';
import isAdmin  from '@/middlewares/isAdmin.middleware';

class ScheduledRecommendationsRoute implements Route {
  public path = '/scheduledRecommendations/';
  public router = Router();
  private scheduledRecommendationsController = new ScheduledRecommendationsController();

  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.post(`${this.path}getAll`, isAdmin, this.scheduledRecommendationsController.getAllScheduledRecommendations);
    this.router.post(`${this.path}getWeekly`, isAdmin, this.scheduledRecommendationsController.getWeeklyScheduledRecommendations);
    this.router.post(`${this.path}update`, isAdmin, this.scheduledRecommendationsController.updateScheduledRecommendation);
    this.router.post(`${this.path}retry`, isAdmin, this.scheduledRecommendationsController.retryScheduledRecommendation);
  }
}

export default ScheduledRecommendationsRoute;
