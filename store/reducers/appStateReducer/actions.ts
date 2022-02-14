import { AppStateTypes, AppAuthActionsType, AppSetDevModeAction } from './types';
// import { AppState } from '../../../models/AppState';

export const setAppStateDevMode = (is_dev: boolean): AppSetDevModeAction => {
  return {
    type: AppStateTypes.SetDevMode,
    payload: {
      is_dev,
    },
  };
};

export const signInApp = (): AppAuthActionsType => {
  return {
    type: AppStateTypes.SignIn,
  };
};

export const signOutApp = (): AppAuthActionsType => {
  return {
    type: AppStateTypes.SignOut,
  };
};
