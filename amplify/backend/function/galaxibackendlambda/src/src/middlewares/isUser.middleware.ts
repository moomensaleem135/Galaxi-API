import { NextFunction, Response, Request } from 'express';
import DB from '@databases';
import HttpException from '@exceptions/HttpException';

const isUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const googleId = req.body.googleId;
    if (googleId) {
      const findUser  = await DB.Users.findOne({
        where: { googleId },
      });
      if (findUser ) {
        next();
      } else {
        next(new HttpException(400, 'You are not User!'));
      }
    } else {
      next(new HttpException(400, 'Authentication googleId missing'));
    }
  } catch (error) {
    next(new HttpException(400, 'Wrong authentication googleId'));
  }
};

export default isUserMiddleware;
