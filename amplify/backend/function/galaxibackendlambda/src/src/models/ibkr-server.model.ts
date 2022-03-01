import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IbkrServerInterface } from '@/interfaces/ibkr-server.interface';

export type IbkrServerCreationAttributes = Optional<IbkrServerInterface, 'id'| 'ip_address'| 'port' | 'account_type' | 'enabled' | 'currently_used' >;

export class IbkrServerModel extends Model<IbkrServerInterface, IbkrServerCreationAttributes> implements IbkrServerInterface {
  public id: number;
  public ip_address: string;
  public port: string;
  public account_type: string;
  public enabled: boolean;
  public currently_used: boolean;
}

export default function (sequelize: Sequelize): typeof IbkrServerModel {
  IbkrServerModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ip_address: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      port: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      account_type: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      enabled: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      currently_used: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'ibkrserver',
      sequelize,
      timestamps: false,
    },
  );

  return IbkrServerModel;
}
