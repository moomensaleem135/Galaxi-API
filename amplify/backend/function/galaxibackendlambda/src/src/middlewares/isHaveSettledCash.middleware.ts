import { NextFunction, Response, Request } from 'express';
import DB from '@databases';
import HttpException from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { RoleTypes } from '@/interfaces/users.interface';

const isHaveSettledCashMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { amount, googleId } = req.body;

  try {
    if (googleId) {
      const findUser  = await DB.Users.findOne({
        where: { googleId },
      });
      const isHaveSettledCash = findUser.settledCash as number;
      
      if (isHaveSettledCash > amount) {
        next();
      } else {
        next(new HttpException(201, "you don't have sufficient balance!"));
      }
    } else {
      next(new HttpException(404, 'Authentication googleId missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication googleId'));
  }
};

export default isHaveSettledCashMiddleware;
