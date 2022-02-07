import { ContractTypes, ContractAction } from './types';
// import { Contract } from '../../../models/Contract';

export const getContractStateData = (is_active: boolean): ContractAction => {
  return {
    type: ContractTypes.GetContractState,
    payload: { is_active },
  };
};
