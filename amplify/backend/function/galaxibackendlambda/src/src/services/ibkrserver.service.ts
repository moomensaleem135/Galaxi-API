import { IbkrServerInterface } from '@/interfaces/ibkr-server.interface';
import DB from '@databases';
import HttpException from '@exceptions/HttpException';
import { Op } from 'sequelize';

class IbkrServerService {
  public ibkrServer = DB.IbkrServerModel;

  public async createIbkrServer(q_dict: IbkrServerInterface): Promise<IbkrServerInterface> {
    try {
      const findServer: IbkrServerInterface = await this.ibkrServer.findOne({
        where: {
          [Op.or]: [
            {
              ip_address: q_dict.ip_address,
            },
            {
              port: q_dict.port
            }
          ],
        },
      });
  
      if (findServer) throw new HttpException(201, `Server with ${findServer.ip_address} already exists`);
  
      const createibkrServer: IbkrServerInterface = await this.ibkrServer.create({ ...q_dict });
      return createibkrServer;
    } catch (error) {
      throw new Error(error);
    }
    
  }
}

export default IbkrServerService;
