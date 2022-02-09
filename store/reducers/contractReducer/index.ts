import { Reducer } from 'redux';
import { Contract } from '../../../models/Contract';
import { ContractTypes } from './types';

const initialState: Contract = {
  is_active: false,
};

const contractReducer: Reducer = (state = initialState, action): Contract => {
  switch (action.type) {
    case ContractTypes.GetEventStatus:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default contractReducer;
