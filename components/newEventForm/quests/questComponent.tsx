/* eslint-disable @next/next/no-img-element */
import React from 'react';
// Models and types
import { Quest } from '../../../models/Event';
// Icons
import RemoveIcon from '../../icons/RemoveIcon';

export type QuestChangeCallback = (index: number, field: string, value: string) => void;

interface QuestProps {
  quest: Quest;
  index: number;
  onQuestChange: QuestChangeCallback;
  removable: boolean;
  removeQuest: (index: number) => void;
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
    <div className="flex flex-col p-5 mb-2 rounded-lg shadow-lg bg-white max-w-md">
      <img className="rounded mb-4" src={`/${index + 1}.png`} alt="" />

      <input
        type="text"
        name="qr_prefix"
        onChange={onInputChange}
        value={quest.qr_prefix}
        className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        mb-2
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="qr_prefix"
      />
      <input
        type="text"
        name="reward_title"
        onChange={onInputChange}
        value={quest.reward_title}
        className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        mb-2
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="reward_title"
      />
      <textarea
        name="reward_description"
        onChange={onTextAreaChange}
        value={quest.reward_description}
        className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        mb-2
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="reward_description"
      />
      <input
        type="text"
        name="reward_url"
        onChange={onInputChange}
        value={quest.reward_url}
        className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        mb-2
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="reward_url"
      />
      {removable && (
        <button
          onClick={deleteQuest}
          type="button"
          className="flex flex-row pb-2 justify-between my-1 items-center border-b-2"
        >
          Remove Quest
          <RemoveIcon />
        </button>
      )}
    </div>
  );
};

export default QuestComponent;
