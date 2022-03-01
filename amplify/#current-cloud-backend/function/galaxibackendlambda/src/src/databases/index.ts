import config from 'config';
import Sequelize from 'sequelize';
import { dbConfig } from '@interfaces/db.interface';
import UserModel from '@models/users.model';
import { logger } from '@utils/logger';
import IbkrServerModel from '@models/ibkr-server.model';
import TickersDataGFModel from '@models/tickers-data-gf.model';
import TickersDataYFModel from '@models/tickers-data-yf.model';
import AllTickersModel from '@models/all-tickers.model';
import OrdersModel from '@models/orders.model';
import PaymentModel from '@models/payment.model';
import StripePaymentModel from '@models/stripePayment.model';
import WithdrawBankTransferModel from '@models/withdrawBankTransfer.model';
import RecommendationsModel from '@models/recommendation.model';
import PurchasesModel from '@models/purchases.model';
import ScheduledRecommendationsModel from '@models/schedule_recommendations.model';
import MembershipsModel from '@models/memberships.model';
import StrategyModel from '@/models/strategy.model';
import RecommendationsDataModel from '@/models/recommendationsData.model';
import MsciDataModel from '@/models/msci.model';
import MsciHistoricalDataModel from '@/models/msci-historical.model';
import CryptoModel from '@/models/crypto.model';
import CryptoLogoModel from '@/models/crypto_logo.model';
import ScheduledCryptoModel from '@/models/schedule_cryptos.model';

const { host, user, password, database, pool }: dbConfig = config.get('dbConfig');
const sequelize = new Sequelize.Sequelize(database, user, password, {
  host: host,
  dialect: 'postgres',
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
    timestamps: false,
  },
  pool: {
    min: pool.min,
    max: pool.max,
    idle: 300000,
    acquire: 300000,
  },
  logQueryParameters: process.env.NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  Users: UserModel(sequelize),
  TickersDataGF: TickersDataGFModel(sequelize),
  TickersDataYF: TickersDataYFModel(sequelize),
  Tickers: AllTickersModel(sequelize),
  IbkrServerModel: IbkrServerModel(sequelize),
  Orders: OrdersModel(sequelize),
  Recommendations: RecommendationsModel(sequelize),
  RecommendationsData: RecommendationsDataModel(sequelize),
  Payment: PaymentModel(sequelize),
  StripePayment: StripePaymentModel(sequelize),
  Purchases: PurchasesModel(sequelize),
  Scheduled: ScheduledRecommendationsModel(sequelize),
  WithdrawBankTransfer: WithdrawBankTransferModel(sequelize),
  Memberships: MembershipsModel(sequelize),
  StrategyModel: StrategyModel(sequelize),
  Msci: MsciDataModel(sequelize),
  MsciHistorical: MsciHistoricalDataModel(sequelize),
  Crypto: CryptoModel(sequelize),
  CryptoIcon: CryptoLogoModel(sequelize),
  ScheduledCrypto: ScheduledCryptoModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

DB.RecommendationsData.hasMany(DB.Purchases, { foreignKey: 'recommendation_id' });
DB.Purchases.belongsTo(DB.RecommendationsData, { foreignKey: 'recommendation_id', targetKey: 'id' });

DB.Orders.hasMany(DB.Purchases, { foreignKey: 'order_id' });
DB.Orders.belongsTo(DB.Tickers, { foreignKey: 'symbol', targetKey: 'ticker_symbol' });
DB.Purchases.belongsTo(DB.Orders, { foreignKey: 'order_id', targetKey: 'order_id' });

DB.TickersDataGF.belongsTo(DB.Tickers, { foreignKey: 'ticker_symbol', targetKey: 'ticker_symbol' });
DB.TickersDataYF.belongsTo(DB.Tickers, { foreignKey: 'ticker_symbol', targetKey: 'ticker_symbol' });
DB.Scheduled.belongsTo(DB.RecommendationsData, { foreignKey: 'recommendations_id', targetKey: 'id' });

DB.Users.belongsTo(DB.Memberships, { foreignKey: 'membership_id', targetKey: 'id' });

DB.Crypto.belongsTo(DB.CryptoIcon, { foreignKey: 'crypto_symbol', targetKey: 'crypto_symbol' });

export default DB;
