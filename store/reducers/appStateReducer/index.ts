import { Reducer } from 'redux';
import { AppState } from '../../../models/AppState';
import { AppStateTypes } from './types';

const initialState: AppState = {
  is_dev: false,
  is_authed: false,
  is_loading: true,
};

const appStateReducer: Reducer = (state = initialState, action): AppState => {
  switch (action.type) {
    case AppStateTypes.SetDevMode:
      return {
        ...state,
        ...action.payload,
      };
    case AppStateTypes.SignIn:
      return {
        ...state,
        is_authed: true,
      };
    case AppStateTypes.SignOut:
      return {
        ...state,
        is_authed: false,
      };
    case AppStateTypes.SetAppLoadingState:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default appStateReducer;
