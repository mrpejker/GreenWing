// import { AppState } from '../../../models/AppState';

export enum AppStateTypes {
  SetDevMode = 'SET_DEV_MODE',
  SignIn = 'SIGN_IN',
  SignOut = 'SIGN_OUT',
  SetAppLoadingState = 'SET_APP_LOADING_STATE',
}

interface AppSignInAction {
  type: AppStateTypes.SignIn;
}

interface AppSignOutAction {
  type: AppStateTypes.SignOut;
}

export interface AppSetDevModeAction {
  type: AppStateTypes.SetDevMode;
  payload: {
    is_dev: boolean;
  };
}

export interface AppLoadingStateAction {
  type: AppStateTypes.SetAppLoadingState;
  payload: {
    is_loading: boolean;
  };
}

export type AppAuthActionsType = AppSignInAction | AppSignOutAction;
