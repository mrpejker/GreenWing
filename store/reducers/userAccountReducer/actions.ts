import { UserAccountTypes } from './types';
import { UserAccount } from '../../../models/UserAccount';

export const getUserAccountData = (data: UserAccount) => {
  return {
    type: UserAccountTypes.GetUserAccountData,
    payload: data,
  };
};
