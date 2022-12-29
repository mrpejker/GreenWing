import React, { useState, useEffect } from 'react';

interface AccordionProps {
  accordionTitle: React.ReactElement | string;
  activeIndex?: number;
  currentIndex: number;
  activeIndexCallback?: (index: number) => void;
  children: React.ReactElement | string;
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  accordionTitle,
  activeIndex,
  currentIndex,
  activeIndexCallback,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const toggleCollapsed = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const id = (event.target as HTMLButtonElement).id;
    const element = document.getElementById(id);
    element && element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsCollapsed(!isCollapsed);
    // activeIndexCallback(currentIndex);
  };
  useEffect(() => {
    if (activeIndex === currentIndex) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  }, [activeIndex, currentIndex]);

  return (
    <div
      className={
        'flex flex-col w-full rounded-[25px] p-[25px] mt-[20px] border-gray-200 shadow-sm ' +
        (!isCollapsed && 'bg-[#F5F5F5]')
      }
    >
      <button
        type="button"
        onClick={toggleCollapsed}
        className={`${
          !isCollapsed && 'font-bold text-[#B1B1B1]'
        } flex text-[#3D3D3D] transition-color ease-in-out font-interBold text-[20px] justify-between`}
        id={`accordion_${currentIndex}`}
      >
        <b>{accordionTitle}</b>
        <b>{isCollapsed ? '+' : '-'}</b>
      </button>
      <div
        className={
          'origin-top accordion-collapse content-center items-center flex overflow-y-hidden my-[30px] ' +
          (isCollapsed ? 'collapse' : 'show')
        }
      >
        <div className="accordion-body text-[#3D3D3D]">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
