import React from 'react';
// Models and types
import { Quest } from '../../../models/NewEvent';
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
    <>
      <h5 className="my-1">Quest #{index + 1}</h5>

      <input
        type="text"
        name="qr_string"
        onChange={onInputChange}
        value={quest.qr_string}
        className="my-1 placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="QR String"
      />
      <input
        type="text"
        name="nft_title"
        onChange={onInputChange}
        value={quest.nft_title}
        className="my-1 placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="NFT Title"
      />
      <textarea
        name="nft_description"
        onChange={onTextAreaChange}
        value={quest.nft_description}
        className="my-1 resize-none placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="NFT Description"
      />
      <input
        type="text"
        name="nft_media"
        onChange={onInputChange}
        value={quest.nft_media}
        className="my-1 placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="NFT Media"
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
    </>
  );
};

export default QuestComponent;
