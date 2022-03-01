import moment from 'moment';
import { Op } from 'sequelize';
import DB from '@databases';
import { MsciResponse } from '@/interfaces/msci.interface';
import { MsciHistorical, FREQUENCY } from '@/interfaces/msci-historical.interface';

class MsciService {
  private MsciData = DB.Msci;
  private MsciHistoricalData = DB.MsciHistorical;

  private getFrequency = (frequency: FREQUENCY): Date => {
    switch (frequency) {
      case FREQUENCY['one-day']:
        return moment().subtract(1, 'days').toDate();
      case FREQUENCY['three-days']:
        return moment().subtract(3, 'days').toDate();
      case FREQUENCY['week']:
        return moment().subtract(1, 'weeks').toDate();
      case FREQUENCY['one-month']:
        return moment().subtract(1, 'months').toDate();
      case FREQUENCY['three-months']:
        return moment().subtract(3, 'months').toDate();
      case FREQUENCY['six-months']:
        return moment().subtract(6, 'months').toDate();
      case FREQUENCY['one-year']:
        return moment().subtract(1, 'years').toDate();
      case FREQUENCY['three-year']:
        return moment().subtract(3, 'years').toDate();
      case FREQUENCY['five-year']:
        return moment().subtract(5, 'years').toDate();
      case FREQUENCY['ten-year']:
        return moment().subtract(10, 'years').toDate();
      case FREQUENCY['max']:
        return moment().subtract(20, 'years').toDate();
      default:
        return moment().subtract(7, 'days').toDate();
    }
  };

  public async get_monthly_data(): Promise<MsciResponse[]> {
    try {
      const latestDate = await this.MsciData.findOne({
        order: [['date', 'desc']],
      });
      const result = await this.MsciData.findOne({
        where: {
          date: {
            [Op.eq]: latestDate.date as any,
          },
        },
      });
      const monthly_data = JSON.parse(result.monthly_data);
      const data = monthly_data.map(dt => {
        if (dt) {
          const date = Object.keys(dt)[0];
          const split_date = date.split('-');
          const res = Object.entries(dt)[0][1] as any;
          const now = new Date(date);
          const onejan = new Date(now.getFullYear(), 0, 1);
          const week = Math.ceil(((now.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
          if (res) {
            res['year'] = split_date[0];
            res['month'] = split_date[1];
            res['week'] = week;
            res['new_formatted_date'] = moment(now).format('MMM YYYY');
          }
          return res;
        }
      }) as MsciResponse[];

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async get_weekly_data(): Promise<MsciResponse[]> {
    try {
      const latestDate = await this.MsciData.findOne({
        order: [['date', 'desc']],
      });
      const result = await this.MsciData.findOne({
        where: {
          date: {
            [Op.eq]: latestDate.date as any,
          },
        },
      });
      const weekly_data = JSON.parse(result.weekly_data);
      const data = weekly_data.map(dt => {
        if (dt) {
          const date = Object.keys(dt)[0];
          const split_date = date.split('-');
          const res = Object.entries(dt)[0][1] as any;
          const now = new Date(date);
          const onejan = new Date(now.getFullYear(), 0, 1);
          const week = Math.ceil(((now.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
          if (res) {
            res['year'] = split_date[0];
            res['month'] = split_date[1];
            res['week'] = week;
            res['new_formatted_date'] = moment(now).format('MMM YYYY');
          }
          return res;
        }
      }) as MsciResponse[];

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async get_daily_data(): Promise<MsciResponse[]> {
    try {
      const latestDate = await this.MsciData.findOne({
        order: [['date', 'desc']],
      });
      const result = await this.MsciData.findOne({
        where: {
          date: {
            [Op.eq]: latestDate.date as any,
          },
        },
      });
      const daily_data = JSON.parse(result.daily_data);
      const data = daily_data.map(dt => {
        if (dt) {
          const date = Object.keys(dt)[0];
          const split_date = date.split('-');
          const res = Object.entries(dt)[0][1] as any;
          const now = new Date(date);
          const onejan = new Date(now.getFullYear(), 0, 1);
          const week = Math.ceil(((now.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
          if (res) {
            res['year'] = split_date[0];
            res['month'] = split_date[1];
            res['week'] = week;
            res['new_formatted_date'] = moment(now).format('MMM YYYY');
          }
          return res;
        }
      }) as MsciResponse[];

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async get_historical_data(frequency: FREQUENCY): Promise<MsciHistorical[]> {
    try {
      const result = await this.MsciHistoricalData.findAll({
        where: {
          date_time: {
            [Op.gte]: this.getFrequency(frequency),
          },
        },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default MsciService;
