import { Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response) => {
    try {
      res.status(200).json({ success: true, message: 'success', error: null, data: {} });
    } catch (error) {
      console.log('Error in IndexController', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };
}

export default IndexController;
