import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ScheduledCryptos } from '@/interfaces/schedule_cryptos.interface';
import { Crypto } from '@/interfaces/crypto.interface';

export type ScheduledCryptosCreationAttributes = Optional<
  ScheduledCryptos,
  'id' | 'status' | 'crypto_symbol' | 'percentage' | 'reason' | 'warning_message' | 'created_at' | 'updated_at'
>;

export class ScheduledCryptosModel extends Model<ScheduledCryptos, ScheduledCryptosCreationAttributes> implements ScheduledCryptos {
  public id: number;
  public status: string;
  public crypto_symbol: string;
  public percentage: number;
  public warning_message: string;
  public reason: string;
  public created_at: Date;
  public updated_at: Date;
  public CryptosModel?: Crypto;
}

export default function (sequelize: Sequelize): typeof ScheduledCryptosModel {
  ScheduledCryptosModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      status: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      crypto_symbol: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      percentage: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      reason: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      warning_message: {
        allowNull: true,
        type: DataTypes.STRING,

      },
      created_at: {
        allowNull: true,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE
      }
    },
    {
      tableName: 'scheduled_cryptos',
      sequelize,
    },
  );

  return ScheduledCryptosModel;
}
