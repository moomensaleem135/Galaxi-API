import { Request, Response } from 'express';
import { AllCriteriaTickersData } from '@/interfaces/all-criterias-tickers-data.interface';
import CriteriaService from '@/services/criteria.service';

class CriteriasController {
  private criteriaService = new CriteriaService();

  public apply_all_criterias = async (req: Request, res: Response) => {
    try {
      const criteriaData: AllCriteriaTickersData[] = await this.criteriaService.apply_all_criterias(req.body);
      res.status(200).json({success: true, message: 'success', error: null, data: [] });
    } catch (error) {
      console.log('Error in CriteriasController', error.messge);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public filterByRetained = async (req: Request, res: Response) => {
    try {
      const criteriaData: AllCriteriaTickersData[] = await this.criteriaService.filterByRetained(req.body);
      res.status(200).json({success: true, message: 'success', error: null, data: criteriaData });
    } catch (error) {
      console.log('Error in CriteriasController', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.messge, data: {} });
    }
  };
}

export default CriteriasController;
