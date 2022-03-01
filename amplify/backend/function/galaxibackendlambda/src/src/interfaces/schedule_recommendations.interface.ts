import { getAllRequest, sortTypes } from "./users.interface"

export interface ScheduledRecommendations {
  id: number;
  status: string;
  recommendations_id: number;
  percentage: number;
  warning_message: string;
  reason: string;
  date_time: Date;
  trading_strategy_id: number;
}

const sortFields = {
  id: 'id',
  status: 'status',
  recommendations_id: 'recommendations_id',
  percentage: 'percentage',
  date_time: 'date_time',
}
export const defaultScheduledRecommendationsRequest: getAllRequest = {
  sortField: sortFields.id,
  sortType: sortTypes.ASC,
  offset: 0,
  size: 100
}