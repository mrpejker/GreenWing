import { ContractTypes } from './types';
import { Contract } from '../../../models/Contract';

export const getContractStateData = (data: Contract) => {
  return {
    type: ContractTypes.GetContractState,
    payload: data,
  };
};
