import { Reducer } from 'redux';
import { Contract } from '../../../models/Contract';
import { ContractTypes } from './types';

const initialState: Contract = {
  is_active: false,
  is_starting: false,
};

const contractReducer: Reducer = (state = initialState, action): Contract => {
  switch (action.type) {
    case ContractTypes.GetEventStatus:
      return {
        ...state,
        ...action.payload,
      };
    case ContractTypes.CreateEvent:
      return {
        ...state,
        is_starting: true,
      };
    case ContractTypes.StopCreateEvent:
      return {
        ...state,
        is_starting: false,
      };
    default:
      return state;
  }
};

export default contractReducer;
