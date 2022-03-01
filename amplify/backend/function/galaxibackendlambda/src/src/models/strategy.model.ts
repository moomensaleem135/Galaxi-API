import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { StrategyData } from '@/interfaces/strategy.interface';

export type StrategyCreationAttributes = Optional<
StrategyData,
  | 'id'
  | 'strategyName'
  | 'description'
>;

export class StrategyModel extends Model<StrategyData, StrategyCreationAttributes> implements StrategyData {
  id: number;
  strategyName: string;
  description: string
}

export default function (sequelize: Sequelize): typeof StrategyModel {
    StrategyModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      strategyName: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
      description:{
        allowNull: true,
        type: DataTypes.STRING(100),   
      }
    },
    {
      tableName: 'trading_strategy',
      sequelize,
    },
  );

  return StrategyModel;
}
