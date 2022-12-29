import React, { useCallback, useEffect, useRef, useState } from 'react';
import { isEnvProd } from '../../utils';

interface NewNearIDInputProps {
  onChange: (text: string) => void;
  inputValue: string;
  placeholder: string;
}

const NewNearIDInput: React.FC<NewNearIDInputProps> = ({ onChange, inputValue, placeholder }) => {
  const [isError, setIsError] = useState<boolean>(false);
  const regex = /[^a-z0-9_]/gi;
  const inputRef = useRef<HTMLInputElement>(null);
  const network = isEnvProd ? '.near' : '.testnet';
  const suffix = String(network);
  const text: string = String(inputValue).toLowerCase().replace(suffix, '');

  const placeCaretToEndOfNearID = useCallback(
    (selectionStart?: number, selectionEnd?: number): void => {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
        if (Number(selectionStart) < text.length && Number(selectionEnd) < text.length) {
          // Place caret to it's place if we editing everything before network id ".testnet" or ".near"
          inputRef.current.selectionStart = Number(selectionStart);
          inputRef.current.selectionEnd = Number(selectionEnd);
          return;
        }
        // Place caret before network id
        inputRef.current.selectionStart = text.length;
        inputRef.current.selectionEnd = text.length;
      }
    },
    [text]
  );

  useEffect(() => {
    // Controlling position of the cursor in the input field after value has changed
    if (inputRef && inputRef.current) {
      const oldSelectionStart = Number(inputRef.current.selectionStart);
      const oldSelectionEnd = Number(inputRef.current.selectionEnd);
      placeCaretToEndOfNearID(oldSelectionStart, oldSelectionEnd);
    }
  }, [placeCaretToEndOfNearID]);

  const onNearIDClick = (event: React.FormEvent<HTMLInputElement>): void => {
    const { selectionStart } = event.currentTarget;
    if (Number(selectionStart) > text.length) {
      placeCaretToEndOfNearID();
    }
  };
  const onNearIDFocus = (): void => {
    // Moving caret out of network id
    if (inputRef && inputRef.current) {
      placeCaretToEndOfNearID();
    }
  };
  const onNearIDKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    // Prevent pressing ArrowRight to not to edit suffix of the near id
    // meaning to leave network id unediting ".testnet" or ".near"
    const { selectionStart, selectionEnd } = event.currentTarget;
    const rightArrowKey = 'ArrowRight';
    const currentKeyPressed = event.key;
    if (inputRef && inputRef.current) {
      if (regex.test(currentKeyPressed)) {
        event.preventDefault();
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 1000);
        return;
      }
      if (
        Number(selectionStart) > text.length - 1 &&
        Number(selectionEnd) > text.length - 1 &&
        currentKeyPressed === rightArrowKey
      ) {
        // Place caret before "." in the network name
        placeCaretToEndOfNearID(text.length - 1, text.length - 1);
        return;
      }
    }
  };
  const onNearIDKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const currentKeyPressed = event.key;
    if (inputRef && inputRef.current) {
      if (regex.test(currentKeyPressed)) {
        event.preventDefault();
        return;
      }
    }
  };
  const onNearIDChange = (event: React.FormEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { value } = event.currentTarget;
    const newText: string = String(value).toLowerCase().replace(suffix, '').replace(regex, '');
    const newValue = newText == '' ? '' : newText + suffix;
    onChange(newValue);
  };

  return (
    <div className="flex flex-col items-center w-full mt-[40px]">
      {isError && <p className="text-[#f24242] font-inter mb-2">Invalid character!</p>}
      <input
        ref={inputRef}
        autoComplete="off"
        type="text"
        name="nearid"
        onChange={onNearIDChange}
        onKeyDown={onNearIDKeyDown}
        onKeyUp={onNearIDKeyUp}
        onClick={onNearIDClick}
        onFocus={onNearIDFocus}
        value={inputValue}
        style={isError ? { borderColor: '#f24242', outline: 'none!important' } : {}}
        className="w-full form-control py-1.5 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default NewNearIDInput;
