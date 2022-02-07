import { Contract } from '../../../models/Contract';

export enum ContractTypes {
  GetContractState = 'GET_CONTRACT_STATE',
}

export interface ContractAction {
  type: ContractTypes.GetContractState;
  payload: Contract;
}
