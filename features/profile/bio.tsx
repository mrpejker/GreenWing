import React from 'react';
import ActiveLink from '../../components/active-link';
import Loader from '../../components/loader';
import UploadImageButton from '../../components/uploadImageButton';

type UserData = {
  name: string;
  bio: string;
  //avatar: string; // for prod
  avatar_url: string; // for dev
  file: File | null;
};

type BioProps = UserData & {
  profile?: any | undefined;
  isEditing?: boolean;
  accountId?: string;
  updateForm: (fields: Partial<UserData>) => void;
};

const Bio: React.FC<BioProps> = ({ isEditing, name, bio, avatar_url, accountId, updateForm }) => {
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const key = e.currentTarget.name;
    updateForm({ [key]: value });
  };

  const handleTextareaChange = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    const value = event.currentTarget.value;
    const key = event.currentTarget.name;
    updateForm({ [key]: value });
  };

  const handleImgChange = (file: File) => {
    updateForm({ file: file });
  };

  const copyToClipBoard = async () => {
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const link = `/linktree/${accountId}`;
    navigator.clipboard.writeText(origin + link);
  };

  return (
    <div className="flex flex-col w-full">
      {/* <Loader is_load={profile === undefined}> */}
      <>
        <div className="flex flex-col justify-between">
          <h2 className="font-grotesk text-[32px] uppercase md:mb-4 text-[#FFFFFF]">Profile</h2>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-center items-baseline mt-2 mb-[20px] md:mb-0">
            <UploadImageButton onImageSet={handleImgChange} url={avatar_url} readonly={!isEditing} />
          </div>
          <div className="flex w-full flex-col items-center">
            <input
              disabled={!isEditing}
              autoComplete="false"
              placeholder="Name"
              name="name"
              onChange={handleInputChange}
              value={name}
              type="text"
              className="w-full mb-2 px-3 py-1.5 text-center font-normal text-white bg-transparent bg-clip-padding border-b-[2px] border-[#57BFFF] transition ease-in-out m-0 outline-none"
            />
            <textarea
              disabled={!isEditing}
              placeholder="Bio"
              name="bio"
              value={bio}
              onChange={handleTextareaChange}
              className="w-full px-3 py-1.5 text-base font-normal text-white bg-transparent bg-clip-padding border-0 transition ease-in-out m-0 outline-none"
            />
            <ActiveLink href={`/linktree/${accountId}`}>
              <span className="text-[#41F092]">{accountId}</span>
            </ActiveLink>
            <button
              onClick={copyToClipBoard}
              type="button"
              className="w-full mt-4 text-center text-[16px] font-inter px-6 py-[16px] bg-[#57BFFF] border-[1px] border-[#019FFF] text-white hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Copy Link
            </button>
          </div>
        </div>
      </>
      {/* </Loader> */}
    </div>
  );
};

export default Bio;
