/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import type { NextPage } from 'next';
import Loader from '../../components/loader';

// Constants (used as test data)
const CHAIN_ID = '1'; // Ethereum mainnet
const CONTRACT_NAME = '0xe4605d46fd0b3f8329d936a8b258d69276cba264';
// const ACCOUNT_1 = '0x9FF6b57E9C6AF293938b3B11742628C82F668E8b';
const ACCOUNT_2 = '0x99c2e4708493b19baa116e26dfa0056f5a69a783';
// const ACCOUNT_3 = '0x1b9524b0f0b9f2e16b5f9e4bad331e01c2267981';

const COVALENTHQ_API_KEY = 'ckey_40e49ac1e6744700b4742f6ddd4';

const NftList: NextPage = () => {
  const [showNftList, setShowNftList] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chainId, setChainId] = useState<any>('');
  const [contractName, setContractName] = useState<any>('');
  const [owner, setOwner] = useState<any>('');
  const [nftList, setNftList] = useState<any>([]);

  const setTestValues = () => {
    setChainId(CHAIN_ID);
    setContractName(CONTRACT_NAME);
    setOwner(ACCOUNT_2);
  };

  // Fetch nfts of owner using covalenthq api
  const getNftListOfOwner = async () => {
    try {
      // Get all NFTs for `chainId` and `contractName`
      const apiGetNftList = `https://api.covalenthq.com/v1/${chainId}/tokens/${contractName}/nft_token_ids/?key=${COVALENTHQ_API_KEY}`;
      const response = await fetch(apiGetNftList);
      const { data } = await response.json();
      const nftList = data.items;

      // Filter all tokens by `owner`
      const nftListOfOwner = [];
      for (let i = 0; i < nftList.length; i++) {
        const id = nftList[i].token_id;
        const apiGetTokenData = `https://api.covalenthq.com/v1/${chainId}/tokens/${contractName}/nft_metadata/${id}/?key=${COVALENTHQ_API_KEY}`;
        const tokenResponse = await fetch(apiGetTokenData);
        const tokenData = await tokenResponse.json();
        const { owner_address, external_data } = tokenData.data.items[0].nft_data[0];
        if (owner_address == owner) {
          const { name, description, image } = external_data;
          nftListOfOwner.push({ id, name, description, image });
          setNftList(nftListOfOwner);
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  // It returns layout of nft data table and loader
  const getTable = () => {
    return (
      <div>
        <table className="min-w-full text-center">
          <thead className="bg-[#d9d9d9b0] text-black font-interBold text-[14px]">
            <tr>
              <th className="text-sm px-4 py-[5px]">Token ID</th>
              <th className="text-sm px-4 py-[5px]">Token name</th>
            </tr>
          </thead>
          <tbody>
            {nftList.map(({ id, name }: { id: string; name: string }, index: number) => (
              <tr
                key={index}
                className="text-[#d9d9d9b0] hover:text-black hover:bg-[#cbd5e173] transition-colors ease-in cursor-pointer"
              >
                <td className="text-sm px-4 py-2 whitespace-nowrap">{id}</td>
                <td className="text-sm px-4 py-2 whitespace-nowrap overflow-x-auto max-w-[300px]">{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Loader is_load={isLoading}>
          <></>
        </Loader>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-center min-h-screen items-center">
        <div className="bg-[#343434] w-full rounded-lg shadow-lg shadow-black max-w-[640px] p-[10px] my-[20px]">
          <div className="flex flex-col max-w-[600px] sm:mx-2 py-[20px]">
            <div className="flex flex-col sm:flex-col w-full sm:justify-between">
              <div className="flex w-full flex-col self-center">
                <button
                  onClick={setTestValues}
                  type="button"
                  className="flex my-4 self-end px-6 py-2.5 bg-zinc-300 text-gray hover:text-zinc-300 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-600 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Use test data
                </button>
                <div className="flex flex-col self-center text-white mb-4 text-[16px]">
                  <h3>Check your nfts using account address, contract address and chain id:</h3>
                  <p className="text-[14px]">&lsquo;1&rsquo; - Ethereum</p>
                  <p className="text-[14px]">&lsquo;131315164&rsquo; - Aurora</p>
                </div>
                <input
                  autoComplete={'false'}
                  placeholder="Chain ID"
                  name="chainId"
                  onChange={(e) => setChainId(e.target.value)}
                  value={chainId}
                  type="text"
                  className="form-control block mb-4 px-3 py-1.5 text-base font-normal text-white bg-transparent bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:border-[#41f092] focus:outline-none"
                />
                <input
                  autoComplete={'false'}
                  placeholder="Contract address"
                  name="contractName"
                  onChange={(e) => setContractName(e.target.value)}
                  value={contractName}
                  type="text"
                  className="form-control block mb-4 px-3 py-1.5 text-base font-normal text-white bg-transparent bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:border-[#41f092] focus:outline-none"
                />
                <input
                  autoComplete={'false'}
                  placeholder="Owner address"
                  name="owner"
                  onChange={(e) => setOwner(e.target.value)}
                  value={owner}
                  type="text"
                  className="form-control block mb-5 px-3 py-1.5 text-base font-normal text-white bg-transparent bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:border-[#41f092] focus:outline-none"
                />
                <button
                  onClick={async () => {
                    setShowNftList(true);
                    setIsLoading(true);
                    await getNftListOfOwner();
                  }}
                  type="button"
                  className="flex my-4 self-center px-6 py-2.5 bg-zinc-300 text-gray hover:text-zinc-300 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-600 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Get NFTs
                </button>
              </div>
              {showNftList && getTable()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftList;
