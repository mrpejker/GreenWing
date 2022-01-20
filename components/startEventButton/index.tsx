import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

const StartEventButton: React.FC = () => {
  const [eventState, changeEventState] = useState(false);
  const toggleEvent = () => changeEventState(!eventState);
  // const dispatch = useAppDispatch();
  const { is_active } = useAppSelector((state) => state.contractReducer);
  const stateString = !is_active ? 'Start event' : 'Stop event';

  return (
    <button
      onClick={toggleEvent}
      className="bg-sky-600"
      style={{ backgroundColor: '#f3fd69', padding: 10, borderRadius: 5 }}
    >
      {stateString}
    </button>
  );
};

export default StartEventButton;
