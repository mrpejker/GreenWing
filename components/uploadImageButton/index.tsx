/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from 'react';
import UploadIcon from '../icons/UploadIcon';

interface UploadImageButtonProps {
  onImageSet?: (file: File) => void;
  file?: File;
  url?: string;
  readonly?: boolean;
}

const UploadImageButton: React.FC<UploadImageButtonProps> = ({ onImageSet, file, url, readonly }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleBtnClick = (): void => {
    if (inputFileRef && inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length) {
      setImgSrc(URL.createObjectURL(event.target.files[0]));
      onImageSet && onImageSet(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      setImgSrc(URL.createObjectURL(file));
      return;
    }

    if (url) {
      setImgSrc(url);
      return;
    }

    setImgSrc(null);
  }, [file, url]);

  return (
    <button
      disabled={readonly}
      type="button"
      onClick={handleBtnClick}
      className="flex bg-transparent justify-center items-center rounded-lg max-w-sm mb-2 hover:bg-gray-200 text-gray-400 hover:text-white transition ease-in-out delay-150 border-0"
    >
      <input
        type="file"
        ref={inputFileRef}
        className="hidden"
        accept="image/png, image/gif, image/jpeg"
        onChange={handleImageChange}
      />
      {imgSrc ? (
        <img src={imgSrc} className="object-contain max-h-[300px]" alt="" />
      ) : (
        <UploadIcon className="m-[40px] h-[105px]" />
      )}
    </button>
  );
};

export default UploadImageButton;
