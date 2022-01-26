import { AppStateTypes } from './types';
// import { AppState } from '../../../models/AppState';

export const setAppStateDevMode = (is_dev: boolean) => {
  return {
    type: AppStateTypes.SetDevMode,
    payload: {
      is_dev,
    },
  };
};

export const signInApp = () => {
  return {
    type: AppStateTypes.SignIn,
  };
};

export const signOutApp = () => {
  return {
    type: AppStateTypes.SignOut,
  };
};
