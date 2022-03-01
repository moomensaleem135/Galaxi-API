import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { CryptoLogo } from '@interfaces/crypto.interface';

export type CryptoLogoCreationAttributes = Optional<CryptoLogo, 'crypto_logo' | 'crypto_symbol' | 'date_time'>;

export class CryptoLogoModel extends Model<CryptoLogo, CryptoLogoCreationAttributes> implements CryptoLogo {
  public crypto_symbol: string;
  public crypto_logo: string;
  public date_time: Date;
}

export default function (sequelize: Sequelize): typeof CryptoLogoModel {
  CryptoLogoModel.init(
    {
      crypto_symbol: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      crypto_logo: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      date_time: {
        allowNull: true,
        type: DataTypes.DATE,
        primaryKey: true,
      },
    },
    {
      tableName: 'crypto_currencies_logo',
      sequelize,
    },
  );

  return CryptoLogoModel;
}
