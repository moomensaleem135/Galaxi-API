import { MemberShipUserInterface } from "./membership.interface"

export interface User {
  id?: number;
  googleId: string;
  email: string;
  roleType: string;
  mode: IMode;
  displayName: string;
  familyName: string;
  givenName: string
  imageUrl: string;
  ibkrServerId: number;
  settledCash: number;
  unsettledCash: number;
  currentBalance: number;
  bkAccId: string;
  bkAccVerified: boolean;
  membershipId: number;
  createdDate: Date;
  updatedDate: Date;
  membershipExpirationTime: Date;
  isTermsAccepted?: boolean;
  tradingStrategyId?: number;
  selectedStrategies?: string;
  membership_data?: string;
}
export interface ExtendedUser extends User {
  membership: MemberShipUserInterface[];
}
export interface IMode {
  Auto: string;
  Manual: string;
}
export const RoleTypes: IRoleTypes = {
  User: 'User',
  Admin: 'Admin',
}
export const Mode: IMode = {
  Auto: 'Auto',
  Manual: 'Manual'
}
export interface IRoleTypes {
  User: string;
  Admin: string;
}
export interface getAllRequest {
  sortField: string;
  sortType: string;
  offset: number;
  size: number;
}

export interface Blancestatus{
  settledCash: number;
  unsettledCash: number;
  currentBalance: number;
}
export interface AccountId{
  bkAccId: string;
  bkAccVerified: boolean;
}
export const sortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
}

const sortFields = {
  ID: 'id',
  GoogleId: 'google_id',
  Email: 'email',
  DisplayName: 'display_name',
  FamilyName: 'family_name',
  Given_name: 'given_name',
  IBKRServerID: 'ibkr_server_id',
  SettledCash: 'settled_cash',
  UnsettledCash: 'unsettled_cash',
  CurrentBalance: 'current_balance',
  CreatedDate: 'created_date',
  UpdatedDate: 'updated_date',
}
export const defaultUserRequest: getAllRequest = {
  sortField: sortFields.ID,
  sortType: sortTypes.ASC,
  offset: 0,
  size: 100
}

