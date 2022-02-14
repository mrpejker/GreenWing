import React, { useState } from 'react';
import { ContractMethods } from '../../constants/contractMethods';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setEventStatus } from '../../store/reducers/contractReducer/actions';
import { getNearContract, getContractState } from '../../utils';

const StartEventButton: React.FC = () => {
  const { is_active } = useAppSelector((state) => state.contractReducer);
  const [btnDisabled, toggleBtnDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const toggleEvent = async (): Promise<void> => {
    toggleBtnDisabled(true);
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

    toggleBtnDisabled(false);
  };
  const stateString = !is_active ? 'Start event' : 'Stop event';

  return (
    <button
      disabled={btnDisabled}
      onClick={toggleEvent}
      className="bg-sky-600"
      style={{ backgroundColor: '#f3fd69', padding: 10, borderRadius: 5 }}
    >
      {stateString}
    </button>
  );
};

export default StartEventButton;
