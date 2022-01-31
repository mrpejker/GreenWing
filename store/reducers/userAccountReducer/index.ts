import { Reducer } from 'redux';
import { UserAccount } from '../../../models/UserAccount';
import { UserAccountTypes } from './types';

const initialState: UserAccount = {
  account_id: '',
  balance: 0,
  public_key: '',
  private_key: '',
};

const userAccountReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case UserAccountTypes.GetUserAccountData:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userAccountReducer;
