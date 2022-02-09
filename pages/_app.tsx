import '../styles/globals.css';
import styles from '../styles/Home.module.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';

import { store } from '../store';
import { getContractState } from '../utils';
import { setEventStatus } from '../store/reducers/contractReducer/actions';
// import { setAppStateDevMode } from '../store/reducers/appStateReducer/actions';
import { getUserAccountData } from '../store/reducers/userAccountReducer/actions';

import { mockUserAccount } from '../mockData/mockUserAccount';

import Header from '../components/header';
import { ContractMethods } from '../constants/contractMethods';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    getContractState(ContractMethods.GET_EVENT_STATUS).then((result: boolean) => {
      console.log('is_active on start: ', result);
      store.dispatch(setEventStatus(result));
      // store.dispatch(setAppStateDevMode(true));
      store.dispatch(getUserAccountData(mockUserAccount));
    });
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>VSELF APP</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.container}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
export default MyApp;
