import { MemberShipUserInterface } from '@/interfaces/membership.interface';
import DB from '@databases';
import HttpException from '@exceptions/HttpException';
import { User, getAllRequest } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import sequelize from 'sequelize';

class AuthService {
  public users = DB.Users;
  public ibkrServer = DB.IbkrServerModel;
  public async deleteById(id: string) {
    if (isEmpty(id)) throw new HttpException(400, "You're not googleId");
    const userData = await this.users.destroy({ where: { googleId: id } });
    return userData;
  }

  public async getAllUsers(req: getAllRequest): Promise<User[]> {
    const { size, sortField, sortType, offset } = req;

    const userData: User[] = await this.users.findAll({
      offset,
      limit: size,
      order: [[sequelize.col(`${sortField}`), sortType]],
    });

    return userData;
  }

  public async getAllUsersCount(): Promise<number> {
    try {
      const count = await this.users.count();
      return count;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getOrCreateUser(userData: any): Promise<User> {
    try {
      const res = await this.ibkrServer.findOne({
        where: {
          enabled: true,
          currently_used: true,
        },
      });
      if (isEmpty(userData)) throw new HttpException(400, 'Authentication googleId is missing');
      const findUser: User = await this.users.findOne({
        where: { googleId: userData.googleId },
      });
      if (findUser && findUser.googleId && findUser.email) {
        if (findUser.membership_data) {
          findUser.membership_data = JSON.parse(findUser.membership_data);
        }
        return findUser;
      }
      userData.ibkrServerId = res.id;
      const createUserData: User = await this.users.create({ ...userData });
      return createUserData;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteUser(userId: number): Promise<User> {
    try {
      if (isEmpty(userId)) throw new HttpException(400, 'Mising userId');

      const findUser: User = await this.users.findOne({
        where: {
          googleId: userId,
        },
      });
      if (!findUser) throw new HttpException(400, 'Invalid User Id');

      await this.users.destroy({ where: { googleId: userId } });

      return findUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateTerms(req:any): Promise<User> {
    try {
      if (isEmpty(req)) throw new HttpException(400, 'Invalid Data');
      const { googleId } = req;
      const findUser = await this.users.findOne({
        where: {
          googleId,
        },
      });
      if (!findUser) throw new HttpException(400, 'User does not exist.');
      findUser.isTermsAccepted = true;
      await findUser.save();

      return findUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateStrategy(req: any): Promise<User> {
    try {
      console.log("req", req);
      if (isEmpty(req)) throw new HttpException(400, 'Invalid Data');
      const { strategies_ids, googleId } = req;
      const findUser = await this.users.findOne({
        where: {
          googleId,
        },
      });
      if (!findUser) throw new HttpException(400, 'User does not exist.');
      findUser.selectedStrategies = strategies_ids;
      await findUser.save();

      return findUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AuthService;
