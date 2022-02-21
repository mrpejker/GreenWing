import React, { useState } from 'react';
import { Quest } from '../../../models/Event';
import Accordion from '../../accordion';
import QuestComponent, { QuestChangeCallback } from './questComponent';

interface QuestsProps {
  quests: Quest[];
  onQuestChange: QuestChangeCallback;
  removeQuest: (index: number) => void;
}

const Quests: React.FC<QuestsProps> = ({ quests, onQuestChange, removeQuest }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <>
      {quests.map((quest, index) => (
        <Accordion
          key={index}
          accordionTitle={`Quest #${index + 1}`}
          activeIndex={activeIndex}
          currentIndex={index}
          activeIndexCallback={setActiveIndex}
        >
          <QuestComponent
            quest={quest}
            onQuestChange={onQuestChange}
            index={index}
            removable={quests.length >= 2}
            removeQuest={removeQuest}
          />
        </Accordion>
      ))}
    </>
  );
};

export default Quests;
