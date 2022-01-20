/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import UserAccountIcon from '../icons/UserAccountIcon';
import { useAppDispatch, useAppSelector } from '../../hooks';
// import { getUserAccountData } from '../../store/reducers/userAccountReducer/actions';

const Header: React.FC = () => {
  // const dispatch = useAppDispatch();
  const { balance, accountId } = useAppSelector((state) => state.userAccountReducer);

  return (
    <div className="container text-center fixed top-0 w-full border-b-2 flex items-center justify-between">
      <img src="/robot.jpg" width={50} height={50} className="rounded-md float-left" alt="logo" />
      <span>{balance}</span>
      <span>{accountId}</span>
      <UserAccountIcon />
    </div>
  );
};

export default Header;
