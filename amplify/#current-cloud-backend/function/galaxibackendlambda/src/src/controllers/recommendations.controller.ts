import { Request, Response } from 'express';
import { Recommendations } from '@/interfaces/recommendations.interface';
import RecommendationsService from '@/services/recommendations.service';

class RecommendationsController {
  private recommendationservice = new RecommendationsService();

  public get_recommendations = async (req: Request, res: Response) => {
    try {
      const recommendData: Recommendations[] = await this.recommendationservice.get_recommendations();
      res.status(200).json({success: true, message: 'success', error: null, data: recommendData });
    } catch (error) {
      console.log('Error in Recommendation Controller', error);
      res.status(400).json({ success: false, message: 'failed', error: error, data: {} });

    }
  };

  //special
  public scheduled_recommendations = async (req: Request, res: Response) => {
    try {
      const resp: any = await this.recommendationservice.scheduled_recommendations(req.body);
      res.status(200).json({success: true, message: 'success', error: null, data: resp });
    } catch (error) {
      console.log('Error in Recommendation Controller', error);
      res.status(400).json({ success: false, message: 'failed', error: error, data: {} });
    }
  };

  public getWeeklyRecommendations = async (req: Request, res: Response) => {
    try {
      const recommendationsData = await this.recommendationservice.getWeeklyRecommendations();
      res.status(200).json({ status: true, message: 'success', error: null, data: recommendationsData });
    } catch (error) {
      console.log('Error in Recommendation Controller', error);
      res.status(400).json({ success: false, message: 'failed', error: error, data: {} });
    }
  };
}

export default RecommendationsController;
