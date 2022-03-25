import { EventTypes } from './types';

export const setEvent = (data: any) => {
  return {
    type: EventTypes.SetEvent,
    payload: { ...data },
  };
};

export const setEventStatus = (is_active: boolean) => {
  return {
    type: EventTypes.GetEventStatus,
    payload: { is_active },
  };
};

export const createEvent = () => {
  return {
    type: EventTypes.CreateEvent,
  };
};

export const stopCreateEvent = () => {
  return {
    type: EventTypes.StopCreateEvent,
  };
};
