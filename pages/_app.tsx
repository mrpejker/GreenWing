import '../styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '../store';
import { getContractState } from '../utils';
import { getContractStateData } from '../store/reducers/contractReducer/actions';
// import { setAppStateDevMode } from '../store/reducers/appStateReducer/actions';
import { getUserAccountData } from '../store/reducers/userAccountReducer/actions';
import { mockUserAccount } from '../mockData/mockUserAccount';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    getContractState().then((result: boolean) => {
      store.dispatch(getContractStateData(result));
      // store.dispatch(setAppStateDevMode(true));
      store.dispatch(getUserAccountData(mockUserAccount));
    });
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
