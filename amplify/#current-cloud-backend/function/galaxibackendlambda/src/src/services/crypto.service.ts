import { Op } from 'sequelize';
import DB from '@databases';
import sequelize from 'sequelize';
import { CryptoModel, CryptoModelExtended } from '@/models/crypto.model';
import { ScheduledCryptoResponse } from '@/interfaces/schedule_cryptos.interface';
import { isEmpty } from '@/utils/util';
import HttpException from '@/exceptions/HttpException';

interface IRequest {
  sortField: string;
  sortType: string;
  offset: number;
  size: number;
}

class CryptService {
  private cryptos = DB.Crypto;
  private cryptoLogos = DB.CryptoIcon;
  private scheduledCryptos = DB.ScheduledCrypto;

  public async getAllCryptos(req: IRequest): Promise<CryptoModelExtended> {
    try {
      const { size, sortField, sortType, offset } = req;
      const latestCryptos = await this.cryptos.findOne({
        order: [['date', 'desc']],
      });
      const { count, rows } = await this.cryptos.findAndCountAll({
        offset,
        limit: size,
        order: [[sequelize.col(`${sortField}`), sortType]],
        where: {
          date: {
            [Op.eq]: latestCryptos.date as any,
          },
        },
        include: [
          {
            model: this.cryptoLogos,
            attributes: ['crypto_logo'],
          },
        ],
      });

      const data: any = rows.map((cry: CryptoModel) => {
        const crypto_logo = cry.CryptoLogoModel.crypto_logo;
        return {
          crypto_symbol: cry.crypto_symbol,
          crypto_change_rate: cry.crypto_change_rate,
          crypto_circulation: cry.crypto_circulation,
          crypto_circualtion_usd: cry.crypto_circualtion_usd,
          crypto_circualtion_usd_rank: cry.crypto_circualtion_usd_rank,
          crypto_online_time: cry.crypto_online_time,
          crypto_price_usd: cry.crypto_price_usd,
          crypto_volume_usd: cry.crypto_volume_usd,
          crypto_time_stamp: cry.crypto_time_stamp,
          date: cry.date,
          update_date_time: cry.update_date_time,
          historical_data: cry.historical_data,
          status: cry.status,
          crypto_logo,
        };
      });
      return {
        count,
        result: data,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  public async scheduled(req: {crypto_symbol: string, percentage: number}): Promise<ScheduledCryptoResponse> {
    if (isEmpty(req)) throw new HttpException(400, 'Invalid Data');
    const { crypto_symbol, percentage } = req;
    if (!crypto_symbol || !percentage) throw new HttpException(400, 'Invalid Data');
    try {
      const createData = {
        crypto_symbol,
        percentage,
        status: 'In Process',
        warning_message: '',
        reason: '',
        created_at: new Date(),
      };

      const scheduled = await this.scheduledCryptos.create(createData);
      await this.cryptos.update(
        {
          status: 'pending',
        },
        {
          where: {
            crypto_symbol,
          },
        },
      );
      const resp = {
        id: scheduled.id,
        status: scheduled.status,
        percentage: scheduled.percentage,
        date: scheduled.created_at,
        reason: scheduled.reason,
        warning_message: scheduled.warning_message,
        crypto_symbol: scheduled.crypto_symbol,
        rule: '',
      };
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateScheduled(req: {id: number, crypto_symbol: string, percentage: number}): Promise<ScheduledCryptoResponse> {
    if (isEmpty(req)) throw new HttpException(400, 'Invalid Data');
    const { id, crypto_symbol, percentage } = req;
    if (!crypto_symbol || !percentage || !id) throw new HttpException(400, 'Invalid Data');
    try {

      await this.scheduledCryptos.update(
        {
          status: 'new',
          warning_message: '',
          reason: '',
          updated_at: new Date(),
          percentage,
        },
        {
          where: {
            id,
          },
        },
      );
      await this.cryptos.update(
        {
          status: 'pending',
        },
        {
          where: {
            crypto_symbol,
          },
        },
      );
      const scheduled = await this.scheduledCryptos.findOne({
        where: {
          id,
        }
      })

      const resp = {
        id: scheduled.id,
        status: scheduled.status,
        percentage: scheduled.percentage,
        date: scheduled.created_at,
        reason: scheduled.reason,
        warning_message: scheduled.warning_message,
        crypto_symbol: scheduled.crypto_symbol,
        rule: '',
      };
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default CryptService;
