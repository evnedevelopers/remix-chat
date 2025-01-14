import { ChangeEvent, KeyboardEventHandler } from "react";
import { isMobile, isTablet } from 'react-device-detect';

export const useMessageInput = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any,
  value: string,
) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyPress: KeyboardEventHandler = (e) => {
    if (e.shiftKey && e.key === 'Enter') {
      setValue((prev: string) => `${prev}`);

      return;
    }
    if (e.key === 'Enter' && !(isTablet || isMobile)) {
      e.preventDefault();
      !!value.trim().length
    }
  };

  return {
    handleKeyPress,
    handleChange,
  };
}