import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);
    if (localValue) {
      return JSON.parse(localValue);
    }
    return initialValue;
  });

  function setLocalValue(localValue) {
    setValue(localValue);
    localStorage.setItem(key, JSON.stringify(localValue));
  };

  return [value, setLocalValue];
}
