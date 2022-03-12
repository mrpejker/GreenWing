import { ContractTypes } from './types';
// import { Contract } from '../../../models/Contract';

export const setEventStatus = (is_active: boolean) => {
  return {
    type: ContractTypes.GetEventStatus,
    payload: { is_active },
  };
};

export const createEvent = () => {
  return {
    type: ContractTypes.CreateEvent,
  };
};

export const stopCreateEvent = () => {
  return {
    type: ContractTypes.StopCreateEvent,
  };
};
