import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Crypto } from '@interfaces/crypto.interface';
import { CryptoLogoModel } from './crypto_logo.model';

export type CryptoCreationAttributes = Optional<Crypto, 'crypto_change_rate' | 'crypto_circualtion_usd' | 'crypto_circualtion_usd_rank' | 'crypto_circulation' | 'crypto_online_time' | 'crypto_price_usd' | 'crypto_symbol' | 'crypto_time_stamp' | 'crypto_volume_usd' | 'date' | 'update_date_time' | 'historical_data' | 'status'>;

export class CryptoModel extends Model<Crypto, CryptoCreationAttributes> implements Crypto {
  public crypto_symbol: string;
  public crypto_change_rate: number;
  public crypto_circulation: number;
  public crypto_circualtion_usd: number;
  public crypto_circualtion_usd_rank: number;
  public crypto_online_time: number;
  public crypto_price_usd: number;
  public crypto_volume_usd: number;
  public crypto_time_stamp: number;
  public date: Date;
  public update_date_time: Date;
  public status: string;
  public CryptoLogoModel?: CryptoLogoModel;
  public historical_data: string;
}

export interface CryptoModelExtended {
  result: CryptoModel[],
  count: number;
}

export default function (sequelize: Sequelize): typeof CryptoModel {
  CryptoModel.init(
    {
      crypto_symbol: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      crypto_change_rate: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      crypto_circulation: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      crypto_circualtion_usd: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      crypto_circualtion_usd_rank: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      crypto_online_time: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      crypto_price_usd: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      crypto_volume_usd: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      crypto_time_stamp: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      historical_data: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      date: {
        allowNull: true,
        type: DataTypes.DATE,
        primaryKey: true,
      },
      update_date_time: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      status: {
        allowNull: true,
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'crypto_currencies',
      sequelize,
    },
  );

  return CryptoModel;
}
