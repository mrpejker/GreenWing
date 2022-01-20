import { AppStateTypes } from './types';
import { AppState } from '../../../models/AppState';

export const setAppStateDevMode = (is_active: boolean) => {
  return {
    type: AppStateTypes.SetDevMode,
    payload: {
      is_active,
    },
  };
};
