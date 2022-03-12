import React from 'react';
// import { ContractMethods } from '../../constants/contractMethods';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setAppLoadingState } from '../../store/reducers/appStateReducer/actions';
import { createEvent, setEventStatus } from '../../store/reducers/contractReducer/actions';
import { getNearAccountAndContract } from '../../utils';

const StartEventButton: React.FC = () => {
  const { is_active } = useAppSelector((state) => state.contractReducer);
  const { account_id } = useAppSelector((state) => state.userAccountReducer);
  const dispatch = useAppDispatch();

  const toggleEvent = async (): Promise<void> => {
    try {
      const { contract } = await getNearAccountAndContract(account_id);
      if (!is_active) {
        dispatch(createEvent());
      } else {
        dispatch(setAppLoadingState(true));
        await contract.stop_event();
        dispatch(setEventStatus(false));
        dispatch(setAppLoadingState(false));
      }
    } catch (err) {
      console.log('Connection to contract ended with errors: ', err);
    }
  };

  const stateString = !is_active ? 'Start event' : 'Stop event';

  return (
    <button
      type="button"
      className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      onClick={toggleEvent}
    >
      {stateString}
    </button>
  );
};

export default StartEventButton;
