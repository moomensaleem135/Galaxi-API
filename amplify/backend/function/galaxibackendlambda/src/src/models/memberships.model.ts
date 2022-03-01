import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { MemberShipInterface } from '@/interfaces/membership.interface';

export type MembershipCreationAttributes = Optional<
  MemberShipInterface,
  'id' | 'description' | 'title' | 'price' | 'date_time' | 'sub_title' | 'time_period' | 'price2'
>;

export class MembershipModel
  extends Model<MemberShipInterface, MembershipCreationAttributes>
  implements MemberShipInterface
{
  public id: number;
  public description: string;
  public title: string;
  public price: number;
  public sub_title: string;
  public date_time: Date;
  public time_period: string;
  public price2: number;
}

export default function (sequelize: Sequelize): typeof MembershipModel {
  MembershipModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(250),
      },
      price: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING(250),
      },
      sub_title: {
        allowNull: true,
        type: DataTypes.STRING(250),
      },
      date_time: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      time_period: {
        allowNull: true,
        type: DataTypes.STRING(250),
      },
      price2: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      }
    },
    {
      tableName: 'memberships',
      sequelize,
    },
  );

  return MembershipModel;
}
