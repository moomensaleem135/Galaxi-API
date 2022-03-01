import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ScheduledRecommendations } from '@/interfaces/schedule_recommendations.interface';
import { Recommendations } from '@/interfaces/recommendations.interface';
import { RecommendationsData } from '@/interfaces/recommendationsData.interface';

export type ScheduledRecommendationsCreationAttributes = Optional<
  ScheduledRecommendations,
  'id' | 'status' | 'recommendations_id' | 'percentage' | 'date_time' | 'reason' | 'warning_message' | 'trading_strategy_id'
>;

export class ScheduledRecommendationsModel extends Model<ScheduledRecommendations, ScheduledRecommendationsCreationAttributes> implements ScheduledRecommendations {
  public id: number;
  public status: string;
  public recommendations_id: number;
  // public recommendations_data_id: number;
  public percentage: number;
  public date_time: Date;
  public reason: string;
  public warning_message: string;
  public recommendationsModel?: Recommendations;
  public recommendationsDataModel?: RecommendationsData;
  public trading_strategy_id: number;

}

export default function (sequelize: Sequelize): typeof ScheduledRecommendationsModel {
  ScheduledRecommendationsModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      status: {
        allowNull: true,
        type: DataTypes.STRING(250),
      },
      recommendations_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      // recommendations_data_id: {
      //   allowNull: true,
      //   type: DataTypes.INTEGER,
      // },
      percentage: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      date_time: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      reason: {
        allowNull: true,
        type: DataTypes.STRING(500),
      },
      warning_message: {
        allowNull: true,
        type: DataTypes.STRING(500),

      },
      trading_strategy_id: {
        allowNull: true,
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'scheduledrecommendations',
      sequelize,
    },
  );

  return ScheduledRecommendationsModel;
}
