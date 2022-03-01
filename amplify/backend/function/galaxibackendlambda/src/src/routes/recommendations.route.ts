import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import RecommendationsController from '@/controllers/recommendations.controller';
import isAdmin  from '@/middlewares/isAdmin.middleware';

class RecommendationsRoute implements Route {
  public path = '/recommendations/';
  public router = Router();
  private recommendationsController = new RecommendationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}getAll`, this.recommendationsController.get_recommendations);
    this.router.post(`${this.path}scheduled`, isAdmin, this.recommendationsController.scheduled_recommendations);
    this.router.post(`${this.path}getWeekly`, isAdmin, this.recommendationsController.getWeeklyRecommendations);
  }
}

export default RecommendationsRoute;
