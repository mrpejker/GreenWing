/* eslint-disable @next/next/no-img-element */
import React from 'react';
// Models and types
import { Quest } from '../../../models/Event';
// Components And Styles

export type QuestChangeCallback = (index: number, field: string, value: string, file?: File) => void;

interface QuestProps {
  quest: Quest;
  index: number;
  removable: boolean;
  onQuestChange: QuestChangeCallback;
  removeQuest: (index: number) => void;
  setFilesArray: (file: File, index: number) => void;
}

const QuestComponent: React.FC<QuestProps> = ({ quest, index, onQuestChange, removable, removeQuest }) => {
  const onInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
    onQuestChange(index, event.currentTarget.name, event.currentTarget.value);
  };

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onQuestChange(index, event.target.name, event.target.value);
  };

  const deleteQuest = (): void => removeQuest(index);

  return (
    <>
      <input
        autoComplete="off"
        type="text"
        name="qr_prefix_enc"
        onChange={onInputChange}
        value={quest.qr_prefix_enc}
        className="form-control block w-full mb-2 px-3 py-1.5 text-base font-normal text-black bg-transparent bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:border-[#41f092] focus:outline-none"
        placeholder="QR Link Text"
      />
      <input
        autoComplete="off"
        type="text"
        name="reward_title"
        onChange={onInputChange}
        value={quest.reward_title}
        className="form-control block w-full mb-2 px-3 py-1.5 text-base font-normal text-black bg-transparent bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:border-[#41f092] focus:outline-none"
        placeholder="Title"
      />
      <textarea
        name="reward_description"
        onChange={onTextAreaChange}
        value={quest.reward_description}
        rows={7}
        className="form-control block w-full mb-2 px-3 py-1.5 text-base font-normal text-black bg-transparent bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:border-[#41f092] focus:outline-none"
        placeholder="Description"
      />
      {removable && (
        <button
          onClick={deleteQuest}
          type="button"
          className="flex my-4 self-center px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] outline-none transition duration-150 ease-in-out"
        >
          Remove NFT
        </button>
      )}
    </>
  );
};

export default QuestComponent;
