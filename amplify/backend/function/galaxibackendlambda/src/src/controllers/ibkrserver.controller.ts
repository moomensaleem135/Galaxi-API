import { Request, Response } from 'express';
import IbkrServerService from '@services/ibkrserver.service';
import { IbkrServerInterface } from '@/interfaces/ibkr-server.interface';

class IbkrServerController {
  public ibkrService = new IbkrServerService();

  public createIbkrServer = async (req: Request, res: Response) => {
    try {
      const q_dict = req.body;
      const serverData: IbkrServerInterface = await this.ibkrService.createIbkrServer(q_dict);
      res.status(200).json({success: true, message: 'success', error: null, data: serverData });
    } catch (error) {
      console.log('Error in IbkrServerController', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };
}

export default IbkrServerController;
