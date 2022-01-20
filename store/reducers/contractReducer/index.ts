import { Reducer } from 'redux';
import { Contract } from '../../../models/Contract';
import { ContractTypes } from './types';

const initialState: Contract = {
  is_active: false,
};

const contractReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ContractTypes.GetContractState:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default contractReducer;
