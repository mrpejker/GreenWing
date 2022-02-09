import { Contract } from '../../../models/Contract';

export enum ContractTypes {
  GetEventStatus = 'GET_EVENT_STATUS',
}

export interface ContractAction {
  type: ContractTypes.GetEventStatus;
  payload: Contract;
}
