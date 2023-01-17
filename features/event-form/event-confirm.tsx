/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { formatTimeStampToLocaleDateString } from '../../utils';
import { ResultFormData } from '.';

interface EventConfirmProps {
  buttonCallback: () => void;
  eventData: ResultFormData;
}

const EventConfirm: React.FC<EventConfirmProps> = ({ buttonCallback, eventData }) => {
  const { files, event_name, event_description, start_time, finish_time, quests } = eventData;
  return (
    <div className="flex flex-col relative overflow-auto">
      <div className="flex justify-center flex-col rounded-lg shadow-lg text-black bg-white">
        <div className="flex-col md:flex-row flex my-2 p-4 self-center">
          <img src="/plane.png" alt="" />
          <div className="md:w-2/5 md:ml-4">
            <h5 className="text-gray-900 text-xl font-medium mb-2">{event_name}</h5>
            <p className="text-gray-700 text-base mb-4">{event_description}</p>
            <p className="text-gray-700 text-base mb-4">
              Start Time: {start_time && formatTimeStampToLocaleDateString(start_time)}
            </p>
            <p className="text-gray-700 text-base mb-4">
              Finish Time: {finish_time && formatTimeStampToLocaleDateString(finish_time)}
            </p>
          </div>
        </div>
        <div className="flex border-t-2 py-5 mt-[auto] pr-5 justify-end">
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-zinc-300 text-black hover:text-zinc-300 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-600 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={buttonCallback}
          >
            Create Event
          </button>
        </div>
      </div>

      <div className="flex w-full flex-row flex-wrap">
        {quests.map((quest, index) => (
          <div key={index} className="flex w-full md:w-1/4 mt-2 px-1">
            <div className="flex flex-col w-full rounded-lg shadow-lg text-black bg-white p-4  hover:bg-gray-200 cursor-pointer">
              <h3 className="font-bold">Quest #{index + 1}</h3>
              <div
                style={{
                  width: '100%',
                  height: 300,
                  maxHeight: 300,
                  backgroundImage:
                    files !== undefined && files.length > 0 && files[index] !== undefined
                      ? `url(${URL.createObjectURL(files[index])})`
                      : 'none',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <span className="mb-2">
                <b>Title:</b> {quest.reward_title}
              </span>
              <span className="mb-2">
                <b>Description:</b> {quest.reward_description}
              </span>
              <span className="mb-2">
                <b>QRLink:</b> {quest.qr_prefix_enc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventConfirm;
