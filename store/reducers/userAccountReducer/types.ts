import { UserAccount } from '../../../models/UserAccount';

export enum UserAccountTypes {
  GetUserAccountData = 'GET_USER_DATA',
}

export interface UserAccountAction {
  type: typeof UserAccountTypes.GetUserAccountData;
  payload: UserAccount;
}
