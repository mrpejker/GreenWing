import { ContractTypes } from './types';
// import { Contract } from '../../../models/Contract';

export const getContractStateData = (is_active: boolean) => {
  return {
    type: ContractTypes.GetContractState,
    payload: is_active,
  };
};
