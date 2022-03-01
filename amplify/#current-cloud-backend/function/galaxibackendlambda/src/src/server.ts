process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import { parse } from  'dotenv'
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import TickerDataGF from '@routes/tickerDataGF.route';
import TickerDataYF from '@routes/tickerDataYF.route';
import CriteriaRoute from '@routes/criteria.route';
import OrderRoute from '@routes/order.route';
import IndexRoute from '@routes/index.route';
import PaymentRoute from '@routes/payment.route';
import StripePaymentRoute from '@routes/stripePayment.route';
import PurchaseRoute from '@routes/purchase.route';
import userPurchasedStocksRoute from '@routes/userPurchasedStocks.route';
import RecommendationsRoute from '@routes/recommendations.route';
import ScheduledRecommendationsRoute from '@routes/scheduledRecommendations.route';
import MembershipsRoute from '@routes/membership.route';
import TradingStrategyRoute from '@routes/strategies.route';
import MsciRoute from '@routes/msci.route';
import CryptoRoute from '@routes/crypto.route';

parse('.env');
const app = new App([
  new IndexRoute(),
  new AuthRoute(),
  new PaymentRoute(),
  new StripePaymentRoute(),
  new PurchaseRoute(),
  new TickerDataGF(),
  new TickerDataYF(),
  new CriteriaRoute(),
  new OrderRoute(),
  new RecommendationsRoute(),
  new ScheduledRecommendationsRoute(),
  new userPurchasedStocksRoute(),
  new MembershipsRoute(),
  new TradingStrategyRoute(),
  new MsciRoute(),
  new CryptoRoute(),
]);

app.listen();
// module.exports.handler = sls(app);
export default app.app;