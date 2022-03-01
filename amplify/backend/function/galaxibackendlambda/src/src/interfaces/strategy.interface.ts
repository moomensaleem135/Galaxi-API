import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export interface StrategyData {
  id: number;
  strategyName: string,
  description: string
}
