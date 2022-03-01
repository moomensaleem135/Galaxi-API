import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IMode, IRoleTypes, Mode, RoleTypes, User } from '@interfaces/users.interface';
import { MembershipModel } from './memberships.model';

export type UserCreationAttributes = Optional<
  User,
  | 'id'
  | 'email'
  | 'roleType'
  | 'mode'
  | 'googleId'
  | 'displayName'
  | 'familyName'
  | 'givenName'
  | 'imageUrl'
  | 'ibkrServerId'
  | 'settledCash'
  | 'unsettledCash'
  | 'currentBalance'
  | 'membershipId'
  | 'bkAccId'
  | 'bkAccVerified'
  | 'createdDate'
  | 'updatedDate'
  | 'membershipExpirationTime'
  | 'isTermsAccepted'
  | 'tradingStrategyId'
  | 'selectedStrategies'
  | 'membership_data'
>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public createdDate: Date;
  public updatedDate: Date;
  public id: number;
  public googleId: string;
  public email: string;
  public roleType: string;
  public mode: IMode;
  public displayName: string;
  public familyName: string;
  public givenName: string;
  public imageUrl: string;
  public ibkrServerId: number;
  public settledCash: number;
  public unsettledCash: number;
  public currentBalance: number;
  public bkAccId: string;
  public bkAccVerified: boolean;
  public membershipId: number;
  public membershipExpirationTime: Date;
  public membership: MembershipModel;
  public isTermsAccepted: boolean;
  public tradingStrategyId: number;
  public selectedStrategies: string;
  public membership_data: string;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      googleId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(255),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      roleType: {
        defaultValue: RoleTypes.User,
        type: DataTypes.STRING(45),
      },
      mode: {
        defaultValue: Mode.Auto,
        type: DataTypes.STRING(45),
      },
      displayName: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      familyName: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      givenName: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      imageUrl: {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      ibkrServerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      settledCash: {
        defaultValue: 0,
        type: DataTypes.FLOAT,
      },
      unsettledCash: {
        defaultValue: 0,
        type: DataTypes.FLOAT,
      },
      currentBalance: {
        defaultValue: 0,
        type: DataTypes.FLOAT,
      },
      createdDate: {
        defaultValue: Date.now(),
        type: DataTypes.DATE,
      },
      updatedDate: {
        type: DataTypes.DATE,
      },
      bkAccId: {
        type: DataTypes.STRING(255),
      },
      bkAccVerified: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      membershipId: {
        type: DataTypes.INTEGER,
      },
      membershipExpirationTime: {
        type: DataTypes.DATE,
      },
      isTermsAccepted:{
        type: DataTypes.BOOLEAN
      },
      tradingStrategyId:{
        type: DataTypes.INTEGER
      },
      selectedStrategies: {
        type: DataTypes.STRING,
        allowNull: true      
      },
      membership_data: {
        type: DataTypes.STRING,
        allowNull: true      
      }
    },
    {
      tableName: 'users',
      sequelize,
    },
  );

  return UserModel;
}
