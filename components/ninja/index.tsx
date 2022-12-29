/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Bubble1Icon from '../icons/Bubble1Icon';
import Bubble2Icon from '../icons/Bubble2Icon';
import Bubble3Icon from '../icons/Bubble3Icon';

const NinjaComponent: React.FC = () => {
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
    return activeBubble === num ? '#0CD0EE' : '#296D96';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="animate-ninja_bounce mb-[-40px] relative ">
        <Bubble1Icon className="absolute z-[10] top-0 left-[-110px]" fill={svgFill(0)} />
        <Bubble2Icon className="absolute z-[10] top-[50px] right-[-80px]" fill={svgFill(1)} />
        <Bubble3Icon className="absolute z-[10] top-[150px] left-[-120px]" fill={svgFill(2)} />
        <img className="" src="/lnd_nj.png" alt="ninja" height={180} width={145} />
      </div>
      <img className="-top-[50%] animate-pulse" height={370} width={109} src="/lnd_tail.png" alt="ninja" />
    </div>
  );
};

export default NinjaComponent;
