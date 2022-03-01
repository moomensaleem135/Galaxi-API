import { NextFunction, Response, Request } from 'express';
import DB from '@databases';
import HttpException from '@exceptions/HttpException';
import { RoleTypes } from '@/interfaces/users.interface';

const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const googleId = req.body.googleId;
    if (googleId) {
      const findUser  = await DB.Users.findOne({
        where: { googleId },
      });
      const roleType = findUser.roleType;
      if (findUser && roleType === RoleTypes.Admin) {
        next();
      } else {
        next(new HttpException(202, 'You are not Admin!'));
      }
    } else {
      next(new HttpException(302, 'Authentication googleId missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication googleId'));
  }
};

export default isAdminMiddleware;
