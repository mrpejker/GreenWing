/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getNearAccountAndContract, getNearWallet } from '../../utils';
import { setEventStatus } from '../../store/reducers/contractReducer/actions';
// import { setAppStateDevMode } from '../../store/reducers/appStateReducer/actions';
import { getUserAccountData } from '../../store/reducers/userAccountReducer/actions';
import { setAppLoadingState, signInApp } from '../../store/reducers/appStateReducer/actions';

import Loader from '../../components/loader';

// import { mockUserAccount } from '../../mockData/mockUserAccount';
// import { Endpoints } from '../../constants/endpoints';
import LoginForm from './loginForm';

interface AppLayoutProps {
  children: React.ReactElement;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { is_authed } = useAppSelector((state) => state.appStateReducer);
  //   const { account_id } = useAppSelector((state) => state.userAccountReducer);
  const dispatch = useAppDispatch();

  const signInToNear = async () => {
    const { signIn } = await getNearWallet();
    signIn();
  };

  const initVselfWebApp = async () => {
    try {
      const { accountId, isSignedIn } = await getNearWallet();
      console.log(accountId, isSignedIn);
      if (isSignedIn) {
        const { contract } = await getNearAccountAndContract(accountId);
        const eventStatus = await contract.is_active();
        dispatch(signInApp());
        dispatch(setEventStatus(eventStatus));
        dispatch(getUserAccountData({ account_id: accountId }));
      }
    } catch (err) {
      console.log('Cannot connect to contract: ', err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setAppLoadingState(false));
    }, 1000);
  }, [is_authed]);

  useEffect(() => {
    initVselfWebApp();
  }, []);

  return <Loader>{is_authed ? children : <LoginForm loginCallBack={signInToNear} />}</Loader>;
};

export default AppLayout;
