import { Request, Response } from 'express';
import MembershipsService from '@/services/membership.service';
import { MemberShipInterface } from '@/interfaces/membership.interface';

class MembershipsController {
  private membershipService = new MembershipsService();

  public getAllMemberships = async (req: Request, res: Response) => {
    try {
      const memberships: MemberShipInterface[] = await this.membershipService.getAllMemberships();
      res.status(200).json({ status: true, message: 'success', error: null, data: memberships });
    } catch (error) {
      console.log('Error in Membership Controller', error.message);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

  public addMembership = async (req: Request, res: Response) => {
    try {
      const memberships: MemberShipInterface = await this.membershipService.addMemberships(req.body);
      res.status(200).json({ status: true, message: 'success', error: null, data: memberships });
    } catch (error) {
      console.log('Error in Mmbership Controller', error);
      res.status(400).json({ success: false, message: 'failed', error: error.message, data: {} });
    }
  };

}

export default MembershipsController;
