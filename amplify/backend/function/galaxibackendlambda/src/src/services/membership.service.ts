import DB from '@databases';
import { MemberShipInterface } from '@/interfaces/membership.interface';

class MembershipsService {
  private membershipsTable = DB.Memberships;

  public async getAllMemberships(): Promise<MemberShipInterface[]> {
    try {
      return await this.membershipsTable.findAll({});
    } catch (error) {
      throw new Error(error);
    }
  }

  public async addMemberships(q_dict: any): Promise<MemberShipInterface> {
    try {
      const membership = await this.membershipsTable.create({ ...q_dict });
      return membership;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getMembership(membershipId: number): Promise<MemberShipInterface> {
    try {
      const membership = await this.membershipsTable.findOne({
        where: { id: membershipId },
      });
      return membership;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default MembershipsService;
