/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import UploadIcon from '../icons/UploadIcon';

interface UploadImageProps {
  onImageChange: (fileString: string, file: File) => void;
  imgInProcess: string;
}

const UploadImage: React.FC<UploadImageProps> = ({ onImageChange, imgInProcess }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setImgSrc(imgInProcess);
  }, [imgInProcess]);

  const handleBtnClick = (): void => {
    if (inputFileRef && inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length) {
      onImageChange(URL.createObjectURL(event.target.files[0]), event.target.files[0]);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBtnClick}
      style={{ minWidth: 400 }}
      className="flex justify-center rounded-lg w-full shadow-lg bg-white max-w-sm mb-2 hover:bg-gray-200 text-gray-200 hover:text-white transition ease-in-out delay-150"
    >
      <input
        type="file"
        ref={inputFileRef}
        className="hidden"
        accept="image/png, image/gif, image/jpeg"
        onChange={handleImage}
      />
      {imgSrc ? (
        <img src={imgSrc} alt="Uploading Image" className="object-cover h-96 w-96 rounded-lg" />
      ) : (
        <div className="p-20">
          <UploadIcon />
        </div>
      )}
    </button>
  );
};

export default UploadImage;
