import React from 'react';

const StartEventButton: React.FC = () => {
  const toggleEvent = () => {
    // console.log();
  };

  const stateString = 'Start event';

  return (
    <button
      type="button"
      className="inline-block px-6 py-2.5 bg-zinc-300 text-black hover:text-zinc-300 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-600 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out"
      onClick={toggleEvent}
    >
      {stateString}
    </button>
  );
};

export default StartEventButton;
