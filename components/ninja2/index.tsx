/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Bubble4Icon from '../icons/Bubble4Icon';
import Bubble5Icon from '../icons/Bubble5Icon';
import Bubble6Icon from '../icons/Bubble6Icon';

const Ninja2Component: React.FC = () => {
  const [activeBubble, setActiveBubble] = useState<number>(1);

  useEffect(() => {
    const bubbleInterval = setInterval(() => {
      const newActiveBubble = activeBubble + 1;
      if (newActiveBubble > 2) {
        setActiveBubble(0);
        return;
      }
      setActiveBubble(newActiveBubble);
    }, 3000);
    return () => {
      clearInterval(bubbleInterval);
    };
  }, [activeBubble]);

  const svgFill = (num: number) => {
    return activeBubble === num ? 'white' : '#296D96';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="animate-ninja_bounce mb-[-40px] relative ">
        <Bubble4Icon className="absolute z-[10] top-[-20px] left-[-90px]" fill={svgFill(0)} />
        <Bubble5Icon className="absolute z-[10] top-[10px] right-[-60px]" fill={svgFill(1)} />
        <Bubble6Icon className="absolute z-[10] top-[150px] left-[-80px]" fill={svgFill(2)} />
        <img className="" src="/lnd_nj.png" alt="ninja" height={180} width={145} />
      </div>
    </div>
  );
};

export default Ninja2Component;
