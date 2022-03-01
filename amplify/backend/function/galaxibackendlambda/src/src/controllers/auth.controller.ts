import { Request, Response } from 'express';
import { User, defaultUserRequest } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import UserBalanceService from '@/services/userBalanceAndMemberShip.service';

class AuthController {
  public authService = new AuthService();
  private userBalanceService = new UserBalanceService();

  public getAllUsers = async (req: Request, res: Response) => {
    const { offset, size, sortField, sortType } = req.body;
    try {
      const usersData: User[] = await this.authService.getAllUsers({
        offset: offset ?? defaultUserRequest.offset,
        size: size ?? defaultUserRequest.size,
        sortField: sortField ?? defaultUserRequest.sortField,
        sortType: sortType ?? defaultUserRequest.sortType,
      });
      const count = await this.authService.getAllUsersCount();
      res.status(200).json({ status: true, message: 'success', error:null, data: usersData});
    } catch (error) {
      console.log('Error in Auth Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public getWeeklyUsers = async (req: Request, res: Response) => {
    try {
      const usersData = await this.userBalanceService.getWeeklyUsers();
      res.status(200).json({ status: true, message: 'success', error: null, data: usersData });
    } catch (error) {
      console.log('Error in Auth Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public getBalancestatus = async (req: Request, res: Response) => {
    try {
      const userBlancestatus = await this.userBalanceService.getBlancestatus(req.body.googleId);
      res.status(200).json({ status: true, message: 'success', error: null, data: userBlancestatus });
    } catch (error) {
      console.log('Error in Auth Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.authService.deleteUser(userId);
      res.status(200).json({ status: true, message: 'success', error: null, data: deleteUserData });
    } catch (error) {
      console.log('Error in Auth Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public getOrCreateUser = async (req: Request, res: Response) => {
    try {
      const createUserData: User = await this.authService.getOrCreateUser(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data:createUserData });
    } catch (error: any) {
      console.log('Error in Auth Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public updateTerms = async (req: Request, res: Response) => {
    try {
      const createUserData: User = await this.authService.updateTerms(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data:createUserData });
    } catch (error: any) {
      console.log('Error in Auth Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public updateStrategy = async (req: Request, res: Response) => {
    try {
      const createUserData: User = await this.authService.updateStrategy(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data:createUserData });
    } catch (error: any) {
      console.log('Error in Auth Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };
}

export default AuthController;
