import { Reducer } from 'redux';
import { AppState } from '../../../models/AppState';
import { AppStateTypes } from './types';

const initialState: AppState = {
  is_dev: false,
};

const appStateReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case AppStateTypes.SetDevMode:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default appStateReducer;
