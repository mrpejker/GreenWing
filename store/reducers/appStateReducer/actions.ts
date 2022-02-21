import { AppStateTypes, AppAuthActionsType, AppSetDevModeAction, AppLoadingStateAction } from './types';
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

export const setAppLoadingState = (is_loading: boolean): AppLoadingStateAction => {
  return {
    type: AppStateTypes.SetAppLoadingState,
    payload: {
      is_loading,
    },
  };
};
