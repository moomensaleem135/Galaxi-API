import { IGetSumDTO, IUserPurchasedStocksDTO } from '@/interfaces/userPurchasedStocks.interface';
import DB from '@databases';
import sequelize from 'sequelize';

class UserPurchasedStocksService {
  private purchases = DB.Purchases;
  private recommendations = DB.RecommendationsData;

  public async getUserPurchasedStocks(googleId: number): Promise<IUserPurchasedStocksDTO[]> {
    const userPurchasedStocksData = await this.purchases.findAll({
      attributes: ['date_time', 'purchase_ammount'],
      include: [
        {
          model: this.recommendations,
          attributes: ['ticker_symbol', 'ticker_name'],
        },
        {
          model: DB.RecommendationsData,
          attributes: ['ticker_symbol', 'ticker_name']
        }
      ],
      where: { googleId },
      raw: true,
    });

    let userPurchasedStocksDataDTO = [];
    if (userPurchasedStocksData.length > 0) {
       userPurchasedStocksDataDTO = userPurchasedStocksData.map(item => {
        const newItem: IUserPurchasedStocksDTO = {
          date_time: item.dateTime,
          purchase_ammount: item.purchase_ammount,
          ticker_name: item['RecommendationsModel.ticker_name'],
          ticker_symbol: item['RecommendationsModel.ticker_symbol'],
        };
        return newItem;
      });
    }
    return userPurchasedStocksDataDTO;
  }

  public async getSum(googleId: number): Promise<IGetSumDTO[]> {
    const sumData = await this.purchases.findAll({
      attributes: [[sequelize.fn('SUM', sequelize.col('purchase_ammount')), 'Sum']],
      include: [
        {
          model: this.recommendations,
          attributes: ['ticker_symbol'],
        },
      ],
      where: { googleId },
      raw: true,
      group: ['RecommendationsDataModel.ticker_symbol'],
    });

    const getSumDataDTO = sumData.map(item => {

      const newItem: IGetSumDTO = {
        amount: item.Sum,
        ticker_symbol: item['RecommendationsModel.ticker_symbol'],
      };

      return newItem;
    });

    return getSumDataDTO;
  }
}

export default UserPurchasedStocksService;
