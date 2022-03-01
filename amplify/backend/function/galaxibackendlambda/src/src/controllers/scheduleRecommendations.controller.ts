import { Request, Response } from 'express';
import ScheduleRecommendationsService from '@/services/scheduleRecommendations.service';
import { ScheduledRecommendations, defaultScheduledRecommendationsRequest } from '@/interfaces/schedule_recommendations.interface';

class ScheduledRecommendationsController {
  private scheduleRecommendations = new ScheduleRecommendationsService();

  public getAllScheduledRecommendations = async (req: Request, res: Response) => {
    const { offset, size, sortField, sortType } = req.body;
    try {
      const scheduledRecommendationsData: ScheduledRecommendations[] = await this.scheduleRecommendations.getAllScheduledRecommendations({
        offset: offset ?? defaultScheduledRecommendationsRequest.offset,
        size: size ?? defaultScheduledRecommendationsRequest.size,
        sortField: sortField ?? defaultScheduledRecommendationsRequest.sortField,
        sortType: sortType ?? defaultScheduledRecommendationsRequest.sortType,
      });
      const count = await this.scheduleRecommendations.getAllScheduledRecommendationCount();
      res.status(200).json({ status: true, message: 'success', data: scheduledRecommendationsData, count: count });
    } catch (error) {
      console.log('Error in Scheduled Recommendations Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public getWeeklyScheduledRecommendations = async (req: Request, res: Response) => {
    try {
      const scheduledRecommendations = await this.scheduleRecommendations.getWeeklyScheduledRecommendations();
      res.status(200).json({ status: true, message: 'success', error: null, data: scheduledRecommendations });
    } catch (error) {
      console.log('Error in scheduled recommendations controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public updateScheduledRecommendation = async (req: Request, res: Response) => {
    try {
      const scheduledRecommendations = await this.scheduleRecommendations.updateScheduledRecommendation(req.body);
      res.status(200).json({ status: true, message: 'success', data: scheduledRecommendations });
    } catch (error) {
      console.log('Error in scheduled recommendations controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public retryScheduledRecommendation = async (req: Request, res: Response) => {
    try {
      const scheduledRecommendations = await this.scheduleRecommendations.retryScheduledRecommendation(req.body);
      res.status(200).json({ status: true, message: 'success', data: scheduledRecommendations });
    } catch (error) {
      console.log('Error in scheduled recommendations controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };
}

export default ScheduledRecommendationsController;
