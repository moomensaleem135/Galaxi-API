import { NextFunction, Response, Request } from 'express';
import DB from '@databases';
import HttpException from '@exceptions/HttpException';

const isBankAccVerifiedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const googleId = req.body.googleId;

    if (googleId) {
      const findUser  = await DB.Users.findOne({
        where: { googleId },
      });
      const isBankAccVerified = findUser.bkAccVerified as boolean;
      
      if (isBankAccVerified) {
        next();
      } else {
        next(new HttpException(401, 'Verifiy your bank Account!'));
      }
    } else {
      next(new HttpException(404, 'Authentication googleId missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication googleId'));
  }
};

export default isBankAccVerifiedMiddleware;
