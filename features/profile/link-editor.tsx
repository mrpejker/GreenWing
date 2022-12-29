/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useCallback, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import LinkMeta from './link-meta';
import { getState } from '../../utils/near';
import { isEnvProd, isStringEmpty, isValidHttpUrl } from '../../utils';
import Loader from '../../components/loader';
import { mainContractName } from '../../utils/contract-methods';

type resultLink = {
  title: string;
  url: string;
  meta: any;
};

interface LinkEditorProps {
  submitLink: (link: resultLink) => void;
  linkToEdit?: resultLink | undefined;
  account_id?: string;
  isNftEdit?: boolean;
}

const emptyLink = {
  title: '',
  url: '',
  meta: null,
};

const LinkEditor: React.FC<LinkEditorProps> = ({ submitLink, linkToEdit, isNftEdit, account_id }) => {
  const [link, editLink] = useState<resultLink>(linkToEdit || emptyLink);
  const [nfts, setNfts] = useState<any[] | null>(null);
  const [errMsg, setErrorMsg] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { title, meta, url } = link;

  const getUrlMeta = async (value: string) => {
    try {
      setErrorMsg(null);
      if (!isNftEdit) {
        const isValid = isValidHttpUrl(value);
        const { data } = await axios.get('/api/parse-links?link=' + value);
        if (!data.error) {
          editLink({ ...link, meta: data, title: data.title, url: value });
        }
        if (!isValid) {
          const { data } = await axios.get('/api/parse-links?link=https://' + value);
          if (!data.error) {
            editLink({ ...link, meta: data, title: data.title, url: value });
          }
        }
      } else {
        let rewards: any;
        let contract_name: any;
        try {
          contract_name = value;
          rewards = await getState(contract_name, String(account_id));
        } catch (err) {
          const url = new URL(value);
          contract_name = url.pathname.replace('/accounts/', '');
          rewards = await getState(contract_name, String(account_id));
        }
        setNfts(rewards);
        editLink({
          ...link,
          title: contract_name,
          meta: {
            contract_name,
            icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/NFT_Icon.png/640px-NFT_Icon.png',
          },
          url: value,
        });
      }
    } catch (err) {
      console.log(err);
      setNfts(null);
      editLink({ ...link, title: value, url: value });
      setErrorMsg('It seems we cannot get your contract address');
    }
    setIsLoading(false);
  };

  const debounceFn = useCallback(debounce(getUrlMeta, 1000), []);

  const handleLinkChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setIsLoading(true);
    editLink({ ...link, url: value });
    debounceFn(value);
  };

  const handleLinkTitleChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    editLink({ ...link, title: value });
  };

  const submitLinkChanges = (event: React.FormEvent<HTMLFormElement>): void => {
    try {
      event.preventDefault();
      debounceFn.cancel();
      if (isStringEmpty(link.url)) {
        return;
      }
      if (isStringEmpty(link.title)) {
        submitLink({ ...link, title: link.url });
        return;
      }
      submitLink(link);
      // Clean State
      // editLink(emptyLink);
    } catch (err) {
      setErrorMsg('It seems link with this title already exists');
    }
  };
  const network = isEnvProd ? 'mainnet' : 'testnet';

  return (
    <form onSubmit={submitLinkChanges} className="sm:min-w-[400px] text-left break-all text-[#3D3D3D]">
      {isNftEdit && (
        <>
          <p className="font-drukMedium uppercase text-black mb-4 break-normal">
            Provide contract address to get your nfts
          </p>
          <p className="font-inter text-black mb-4">
            e.g.{' '}
            <span className="underline hover:no-underline cursor-pointer">
              https://rpc.{network}.near.org/accounts/{mainContractName}
            </span>
          </p>
          <p className="font-inter text-black mb-4">
            or just contract name e.g.{' '}
            <span className="underline hover:no-underline cursor-pointer">{mainContractName}</span>
          </p>
        </>
      )}
      {!isNftEdit && (
        <>
          <p className="font-drukMedium uppercase text-black mb-4 break-normal">Provide link you want to share</p>
          <input
            autoComplete="false"
            placeholder="Title"
            name="newlink"
            onChange={handleLinkTitleChange}
            value={title}
            type="text"
            className={`outline-none form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid ${
              errMsg ? 'border-red-600' : 'border-gray-300'
            } rounded transition ease-in-out m-0 mb-2 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
          />
        </>
      )}
      <input
        autoComplete="false"
        placeholder="Link"
        name="newlink"
        onChange={handleLinkChange}
        value={url}
        type="text"
        className={`outline-none form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid ${
          errMsg ? 'border-red-600' : 'border-gray-300'
        } rounded transition ease-in-out m-0 mb-2 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
      />
      {errMsg && <p className="text-red-600 my-4">{errMsg}</p>}
      <Loader is_load={isLoading}>
        <>
          {meta && <LinkMeta {...meta} />}
          {nfts && (
            <div className="flex flex-row flex-wrap">
              {nfts.map(({ metadata }: any, index: number) => {
                const { media, description, title } = metadata;
                return (
                  <div className="w-1/3 p-1" key={index}>
                    <div className=" flex flex-col rounded-lg p-2 shadow-lg">
                      <p className="text-center">{title}</p>
                      <img
                        className="my-3"
                        src={media}
                        alt={description}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = 'https://wallet.testnet.near.org/failed_to_load.3a5f0340.svg';
                        }}
                      />
                      <p className="text-center mb-2">{description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      </Loader>
      <button
        type="submit"
        className="mt-4 px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      >
        Submit
      </button>
    </form>
  );
};

export default LinkEditor;
