import React from 'react';
import RemoveIcon from '../../components/icons/RemoveIcon';

interface QuestListProps {
  index: number;
  title: string;
  showRemove: boolean;
  mainCallback: (index: number) => void;
  removeCallback: (index: number) => void;
}

const QuestList: React.FC<QuestListProps> = ({ title, index, showRemove, removeCallback, mainCallback }) => {
  const handleMainButton = () => {
    mainCallback(index);
  };
  const handleRemoveButton = () => {
    removeCallback(index);
  };
  return (
    <li key={index} className="flex flex-row py-1 justify-between my-1 border-b-2 hover:bg-slate-100">
      <button type="button" onClick={handleMainButton}>
        <span>{title}</span>
      </button>
      {showRemove && (
        <button onClick={handleRemoveButton} type="button">
          <RemoveIcon />
        </button>
      )}
    </li>
  );
};

export default QuestList;
