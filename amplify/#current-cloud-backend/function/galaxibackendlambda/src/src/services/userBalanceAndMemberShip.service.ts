import DB from '@databases';
import HttpException from '@exceptions/HttpException';
import { IweeklyUsers, requestUpdateSettledCash } from '@interfaces/userBalance.interface';
import { User, Blancestatus } from '@interfaces/users.interface';
import { MemberShipUserInterface } from '@/interfaces/membership.interface';
import { isEmpty } from '@utils/util';
import sequelize, { Sequelize } from 'sequelize';
import { Op } from 'sequelize';
import { weekNumber } from 'weeknumber';

class UserBalanceService {
  private Users = DB.Users;
  private daysInWeek = 7;
  private weeks = 5;
  private sixWeekAgo = new Date(new Date().setDate(new Date().getDate() - this.daysInWeek * this.weeks));

  public async getAccountId(googleId: number): Promise<string> {
    if (isEmpty(googleId)) throw new HttpException(400, 'Google ID should be greater than 0! ');
    try {
      const userBK_AccountID = await this.Users.findOne({
        where: { googleId },
      });

      return userBK_AccountID.bkAccId;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateBkAccVerified(googleId: number): Promise<boolean> {
    if (isEmpty(googleId)) throw new HttpException(400, 'Google ID should be greater than 0! ');
    try {
      const user = await this.Users.findOne({
        where: { googleId },
      });

      user.bkAccVerified = true;
      await user.save();

      return user.bkAccVerified;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateAccountId(googleId: number, BK_AccId: string): Promise<string> {
    if (isEmpty(googleId)) throw new HttpException(400, 'Google ID should be greater than 0! ');
    try {
      const user = await this.Users.findOne({
        where: { googleId },
      });

      user.bkAccId = BK_AccId;
      await user.save();

      return user.bkAccId;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateSettledCash(Data: requestUpdateSettledCash): Promise<User> {
    if (isEmpty(Data)) throw new HttpException(400, 'Amount should be greater than 0! ');
    try {
      const user = await this.Users.findOne({
        where: {
          googleId: Data.googleId,
        },
      });
      if (user) {
        user.settledCash = user.settledCash + Data.amount;
        user.currentBalance = user.settledCash + user.unsettledCash;
        user.updatedDate = Date.now() as unknown as Date;

        await user.save();
        return user;
      } else {
        console.log('user not found against googleId =', Data.googleId);
        throw new Error('user not found against googleId =' + Data.googleId);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  public async withdrawSettledCash(Data: requestUpdateSettledCash): Promise<User> {
    if (isEmpty(Data)) throw new HttpException(400, 'Amount should be greater than 0! ');
    try {
      const user = await this.Users.findOne({
        where: {
          googleId: Data.googleId,
        },
      });
      if (user) {
        user.settledCash = user.settledCash - Data.amount;
        user.currentBalance = user.settledCash + user.unsettledCash;
        user.updatedDate = Date.now() as unknown as Date;

        await user.save();
        return user;
      } else {
        console.log('user not found against googleId =', Data.googleId);
        throw new Error('user not found against googleId =' + Data.googleId);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  public async updateUnSettledCash(Data: requestUpdateSettledCash): Promise<User> {
    if (isEmpty(Data)) throw new HttpException(400, 'Amount should be greater than 0! ');
    try {
      const user = await this.Users.findOne({
        where: {
          googleId: Data.googleId,
        },
      });
      if (user && user.settledCash >= Data.amount) {
        user.settledCash = user.settledCash - Data.amount;
        user.unsettledCash = user.unsettledCash + Data.amount;
        user.currentBalance = user.settledCash + user.unsettledCash;
        user.updatedDate = Date.now() as unknown as Date;

        await user.save();
        return user;
      } else {
        console.log('user not found against googleId =', Data.googleId);
        if (!user) throw new Error('user not found against googleId =' + Data.googleId);
        throw new Error("You don't have enough settled cash!");
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  public async updateMembershipId( googleId: number, membershipId: number ) {
    try {
      const user = await this.Users.findOne({
        where: {
          googleId
        },
      });
      if (user && !user.membershipId) {
        const membership = await DB.Memberships.findOne({
          where: {
            id: membershipId
          }
        });
        user.membershipId = membershipId;
        user.updatedDate = Date.now() as unknown as Date;
        if (membership.title === 'Get Anaylsis' || membership.id === 1) {
          user.membershipExpirationTime =  new Date(new Date().setDate(new Date().getDate() + 365));
        }
        await user.save();
        return user;
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  public async updateMembershipData(googleId: number, membershipId: number, isExpired: boolean = false ): Promise<User> {
    try {
      const user = await this.Users.findOne({
        where: {
          googleId
        },
      });
      if (!user && !user.googleId) {
        throw new Error("Invalid User");
      }
      const membership = await DB.Memberships.findOne({
        where: {
          id: membershipId
        }
      });
      if (!membership && !membership.id) {
        throw new Error("Invalid Membership Id");
      }
      if (user.membership_data) {
        const memberShipData = JSON.parse(user.membership_data) as MemberShipUserInterface[];
        const index = memberShipData.findIndex((membership: MemberShipUserInterface) => membership.id === membershipId);
        if (index > -1 && isExpired === false) {
          memberShipData[index].is_cancel = true;
        } else if (index > -1 && isExpired === true) {
          memberShipData.splice(index, 1);
        } else {
          const data = {
            expiration_time: membership.id === 1 ?  new Date(new Date().setDate(new Date().getDate() + 365)) : "",
            id: membership.id,
            price: membership.price,
            title: membership.title,
            is_cancel: false,
          } as MemberShipUserInterface;
          memberShipData.push(data);
        }
        user.membership_data = JSON.stringify(memberShipData);
        user.updatedDate = Date.now() as unknown as Date;
        await user.save();
        return user;
      } else {
        const memberShipData = [] as MemberShipUserInterface[];
        const data = {
          expiration_time: membership.id === 1 ?  new Date(new Date().setDate(new Date().getDate() + 365)) : "",
          id: membership.id,
          price: membership.price,
          title: membership.title,
        } as MemberShipUserInterface;
        memberShipData.push(data);
        user.membership_data = JSON.stringify(memberShipData);
        user.updatedDate = Date.now() as unknown as Date;
        await user.save();
        return user;
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  public async getBlancestatus(googleId: number): Promise<Blancestatus> {
    try {
      const user = await this.Users.findOne({
        where: { googleId },
      });
      const userBalancDTO: Blancestatus = {
        currentBalance: this.twoFraction(user.currentBalance as number),
        settledCash: this.twoFraction(user.settledCash as number),
        unsettledCash: this.twoFraction(user.unsettledCash as number),
      };
      return userBalancDTO;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getWeeklyUsers() {
    try {
      const weeklyUsers = await this.Users.findAll({
        attributes: [
          [sequelize.fn('date_part', 'week', sequelize.col('created_date')), 'weekN'],
          [sequelize.fn('COUNT', sequelize.col('created_date')), 'count'],

          [Sequelize.literal(`min(created_date)`), 'min'],
        ],
        where: {
          createdDate: { [Op.between]: [this.sixWeekAgo, Date.now() as unknown as Date] },
        },
        raw: true,
        group: ['weekN'],
      });
      const weeklyUsersDto = weeklyUsers as unknown as IweeklyUsers[];

      const startWeek = weekNumber(this.sixWeekAgo);
      const endWeek = startWeek + this.weeks;

      for (let i = startWeek; i <= endWeek; i++) {
        const filteredItem = weeklyUsersDto.filter(item => item.weekN == i);

        if (filteredItem.length == 0) {
          weeklyUsersDto.push({ weekN: i, min: Date.now() as unknown as Date, count: 0 });
        }
      }
      weeklyUsersDto.sort((firstItem, secondItem) => firstItem.weekN - secondItem.weekN);
      return weeklyUsersDto;
    } catch (err) {
      throw new Error(err);
    }
  }

  public twoFraction = (n: number) => {
    const num1 = String(n).split('.')[0] ?? 0;
    const num2 = (String(n).split('.')[1] ?? 0).toString().slice(0, 2);
    return Number(num1 + '.' + num2);
  };
}

export default UserBalanceService;
