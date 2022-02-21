import React from 'react';
import { ContractMethods } from '../../constants/contractMethods';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setAppLoadingState } from '../../store/reducers/appStateReducer/actions';
import { setEventStatus } from '../../store/reducers/contractReducer/actions';
import { getNearContract, getContractState } from '../../utils';

const StartEventButton: React.FC = () => {
  const { is_active } = useAppSelector((state) => state.contractReducer);
  const dispatch = useAppDispatch();

  const toggleEvent = async (): Promise<void> => {
    dispatch(setAppLoadingState(true));
    try {
      const { contract } = await getNearContract();
      if (!is_active) {
        await contract.start_event();
      } else {
        await contract.stop_event();
      }
      const eventStatus = await getContractState(ContractMethods.GET_EVENT_STATUS);
      dispatch(setEventStatus(eventStatus));
    } catch (err) {
      console.log('Connection to contract ended with errors: ', err);
    }

    dispatch(setAppLoadingState(false));
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
