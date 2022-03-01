import { Request, Response } from 'express';
import { ScheduledCryptoResponse } from '@interfaces/schedule_cryptos.interface';
import CryptoService from '@services/crypto.service';
import { CryptoModelExtended } from '@/models/crypto.model';
import HttpException from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';

class CryptoController {
  public cryptoService = new CryptoService();

  public getAllCryptos = async (req: Request, res: Response) => {
    if (isEmpty(req.body)) throw new HttpException(400, 'Invalid Data');
    const { offset, size, sortField, sortType } = req.body;
    try {
      const cryptosData: CryptoModelExtended = await this.cryptoService.getAllCryptos({
        offset: offset ?? 0,
        size: size ?? 100,
        sortField: sortField ?? 'crypto_symbol',
        sortType: sortType ?? 'desc',
      });
      res.status(200).json({ status: true, message: 'success', error:null, data: cryptosData});
    } catch (error) {
      console.log('Error in Crypto Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public scheduled = async (req: Request, res: Response) => {
    try {
      const cryptosData: ScheduledCryptoResponse = await this.cryptoService.scheduled(req.body);
      res.status(200).json({ status: true, message: 'success', error:null, data: cryptosData});
    } catch (error) {
      console.log('Error in Crypto Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public updateScheduled = async (req: Request, res: Response) => {
    try {
      const cryptosData: ScheduledCryptoResponse = await this.cryptoService.updateScheduled(req.body);
      res.status(200).json({ status: true, message: 'success', error:null, data: cryptosData});
    } catch (error) {
      console.log('Error in Crypto Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

}

export default CryptoController;
