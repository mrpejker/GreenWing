import { UserAccountTypes, UserAccountAction } from './types';
import { UserAccount } from '../../../models/UserAccount';

export const getUserAccountData = (data: UserAccount): UserAccountAction => {
  return {
    type: UserAccountTypes.GetUserAccountData,
    payload: data,
  };
};
