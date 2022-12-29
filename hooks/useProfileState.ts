import { useState } from 'react';

export const useProfileState = () => {
  const [{ namez, bioz }, setState] = useState({
    namez: 'huy',
    bioz: 'jopa',
  });

  return { namez, bioz };
};
