import { ContractTypes, ContractAction } from './types';
// import { Contract } from '../../../models/Contract';

export const setEventStatus = (is_active: boolean): ContractAction => {
  return {
    type: ContractTypes.GetEventStatus,
    payload: { is_active },
  };
};
