/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader';
import Modal from '../../components/modal';
// import { useProfileState } from '../../hooks/useProfileState';
import { addDocToFirestoreWithName, uploadImageToFirebase } from '../../utils/firebase';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import { Endpoints } from '../../constants/endpoints';
import ErrorCreateMessage from '../event-form/error-create';
import Bio from './bio';
import LinkEditor from './link-editor';
import LinkList from './link-list';
import NftList from './nft-list';

type resultLink = {
  [key: string]: string;
};

interface ProfileComponentProps {
  profile: any | null;
  nearid: string;
  isEditing?: boolean;
}

interface formState {
  avatar_url: string;
  name: string;
  bio: string;
  avatar: string;
  file: File | null;
  links: any[];
  nfts: any[];
  subscriptions: any[];
}

const initialFormState = {
  avatar_url: '',
  name: '',
  bio: '',
  avatar: '',
  file: null,
  links: [],
  nfts: [],
  subscriptions: [],
};

const ProfileComponent: React.FC<ProfileComponentProps> = ({ profile, nearid, isEditing }) => {
  const [formState, setFormState] = useState<formState>(initialFormState);
  const { links, nfts, file } = formState;

  function updateForm(fields: Partial<formState>) {
    setFormState((prev) => {
      return { ...prev, ...fields };
    });
  }

  useEffect(() => {
    if (profile) {
      setFormState(profile);
    }
  }, [profile]);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLinkEditing, setIsLinkEditing] = useState<boolean>(false);
  const [isNftEdit, setIsNftEdit] = useState<boolean>(false);
  const [linkToEdit, setLinkToEdit] = useState<any>();
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const { accountId, selector } = useWalletSelector();

  const submitLinkTreeForm = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    // Firebase
    // try {
    //   if (!nearid) {
    //     throw 'Invalid ID';
    //   }
    //   // Adding new document to Firestore collection of users
    //   if (file) {
    //     uploadImageToFirebase(file).then((url) => {
    //       console.log(url);
    //       addDocToFirestoreWithName('users', String(nearid), { ...formState, avatar: url });
    //     });
    //     // setAnalyticsUserProperties({ avatar: 'changed' });
    //     return;
    //   }
    //   addDocToFirestoreWithName('users', String(nearid), formState);
    //   setIsSuccess(true);
    // } catch (err) {
    //   setIsError(true);
    // }

    // NEAR social
    try {
      if (!nearid) {
        throw 'Invalid ID';
      }

      // Upload new document in Firebase storage
      let avatar_url: any = profile.avatar_url || '';
      if (file) {
        avatar_url = await uploadImageToFirebase(file);
      }

      // Save data in the smart contract
      const wallet = await selector.wallet();
      const data = {
        [accountId!]: {
          vself: {
            avatar_url: String(avatar_url),
            name: String(formState.name),
            bio: String(formState.bio),
            links: Object.assign({}, links),
            subscriptions: Object.assign({}, formState.subscriptions),
            nfts: Object.assign({}, nfts),
          },
        },
      };

      await wallet.signAndSendTransaction({
        signerId: accountId!,
        receiverId: Endpoints.SOCIAL_CONTRACT_URI,
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName: 'set',
              args: { data },
              gas: '30000000000000',
              deposit: '100000000000000000000000',
            },
          },
        ],
      });
      setIsSuccess(true);
    } catch (err) {
      setIsError(true);
    }
  };

  const closeModal = () => {
    setIsSuccess(false);
    setIsLinkEditing(false);
    setIsNftEdit(false);
    setLinkToEdit(null);
    setActiveIndex(-1);
    setIsError(false);
  };

  const openModal = () => {
    setIsLinkEditing(true);
  };

  const openNftModal = () => {
    setIsLinkEditing(true);
    setIsNftEdit(true);
  };

  const handleNewLink = (link: resultLink) => {
    if (isNftEdit) {
      let newNftsArray = [...nfts];
      const checkedNFTSLinksArray = newNftsArray.filter((el) => el.title == link.title);
      if (checkedNFTSLinksArray.length && !linkToEdit) {
        throw 'already exist';
      }
      newNftsArray = [...nfts, link];
      setIsLinkEditing(false);
      setIsNftEdit(false);
      updateForm({ nfts: newNftsArray });
    } else {
      let newLinksArray = [...links];
      const checkedLinksArray = newLinksArray.filter((el) => el.title == link.title);
      if (checkedLinksArray.length && !linkToEdit) {
        throw 'already exist';
      }
      if (activeIndex > -1) {
        newLinksArray[activeIndex] = link;
      } else {
        newLinksArray = [...links, link];
      }

      setActiveIndex(-1);
      setIsLinkEditing(false);
      updateForm({ links: newLinksArray });
    }
    setLinkToEdit(null);
  };

  const selectLinkToEdit = (index: number) => {
    setIsLinkEditing(true);
    setActiveIndex(index);
    setLinkToEdit(links[index]);
  };

  const selectNftLinkToEdit = (index: number) => {
    setIsLinkEditing(true);
    setIsNftEdit(true);
    setActiveIndex(index);
    setLinkToEdit(nfts[index]);
  };

  return (
    <>
      <Modal isOpened={isLinkEditing} closeCallback={closeModal}>
        <LinkEditor
          submitLink={handleNewLink}
          linkToEdit={linkToEdit}
          account_id={String(nearid)}
          isNftEdit={isNftEdit}
        />
      </Modal>
      <Modal isOpened={isSuccess} closeCallback={closeModal}>
        <h2 className="font-drukMedium text-black mb-2">Your changes has been applied</h2>
        <p className="text-[#3D3D3D] mb-4">
          You can see your changes on your{' '}
          <a className="underline text-[#019FFF] hover:no-underline" href={`/linktree/${nearid}`}>
            profile page
          </a>
        </p>
      </Modal>
      <Modal isOpened={isError} isError={isError} closeCallback={closeModal}>
        <ErrorCreateMessage />
      </Modal>
      <Loader is_load={profile === undefined}>
        <form
          onSubmit={submitLinkTreeForm}
          className="flex flex-col items-stretch md:flex-row w-full max-w-[1240px] mb-[40px] px-[20px]"
        >
          <div className="flex flex-col w-full md:max-w-[33%] bg-[#019FFF] rounded-[20px] ">
            <div className="flex w-full flex-col mb-[20px] p-[40px]">
              <Bio isEditing={isEditing} updateForm={updateForm} {...formState} accountId={String(nearid)} />
            </div>
            <div className="flex w-full flex-col bg-[#293FC2] rounded-[20px] py-[30px] px-[40px] relative">
              <LinkList {...formState} isEditing={isEditing} btnCallback={selectLinkToEdit} updateForm={updateForm} />
              {isEditing && (
                <button
                  onClick={openModal}
                  type="button"
                  className="w-full text-center my-4 px-6 py-[16px] bg-transparent border-[1px] border-[#57BFFF] text-[#FFFFFF] text-[16px] font-inter hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                >
                  Add link
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col bg-white w-full md:max-w-[66%] rounded-xl px-[60px] py-[40px] md:ml-[20px]">
            <div className="w-full xl:min-w-[600px] max-w-[1080px] flex-col flex sm:mx-2 relative">
              <div className="flex flex-row justify-between">
                <h2 className="font-grotesk text-[#3D3D3D] text-[32px] uppercase">Nfts</h2>
                {isEditing && (
                  <div className="flex flex-row">
                    <button
                      onClick={openNftModal}
                      type="button"
                      className="flex self-center text-[16px] font-inter mr-[10px] px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    >
                      Add nft
                    </button>
                    <button
                      type="submit"
                      className="flex self-center text-[16px] font-inter px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
              <NftList
                {...formState}
                btnCallback={selectNftLinkToEdit}
                updateForm={updateForm}
                isEditing={isEditing}
                nearid={String(nearid)}
              />
            </div>
          </div>
        </form>
      </Loader>
    </>
  );
};

export default ProfileComponent;
