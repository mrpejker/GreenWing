/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader';
import { getState } from '../../utils/near';
import LinkButton from './link-button';

interface NftLinkProps {
  title?: string;
  meta: any;
  index: number;
  isEditing?: boolean;
  nearid?: string;
  url?: string;
  btnCallback?: (index: number) => void;
  rmvCallback?: (index: number) => void;
}

const NftLink: React.FC<NftLinkProps> = ({ title, meta, index, isEditing, nearid, url, btnCallback, rmvCallback }) => {
  const [nftImgs, setNftImgs] = useState<any>(null);
  useEffect(() => {
    const initLink = async () => {
      try {
        let tokenUrl: any;
        let contract_name: any;
        let imgs: any;
        try {
          tokenUrl = new URL(String(url));
          contract_name = tokenUrl.pathname.replace('/accounts/', '');
          imgs = await getState(contract_name, String(nearid));
        } catch (err) {
          contract_name = url;
          imgs = await getState(contract_name, String(nearid));
        }
        setNftImgs(imgs);
      } catch (err) {
        setNftImgs(null);
      }
    };
    initLink();
  }, [nearid, url]);
  return (
    <div key={index}>
      <div className="max-w-[400px]">
        <LinkButton
          isEditing={isEditing}
          index={index}
          title={title}
          url={url}
          meta={meta}
          btnCallback={btnCallback}
          rmvCallback={rmvCallback}
        />
      </div>
      <div
        className={`${
          !nftImgs ? 'flex items-center' : 'grid grid-cols-1'
        } sm:grid-cols-2 gap-y-[20px] sm:gap-4 auto-cols-max my-[40px]`}
      >
        <Loader is_load={!nftImgs}>
          {nftImgs &&
            nftImgs.map(({ metadata }: any, index: number) => {
              const { media, description, title } = metadata;
              return (
                <div
                  className="flex flex-row rounded-[20px] p-2 bg-[#FFFFFF] border-[2px] border-[#F5F5F5]"
                  key={index}
                >
                  <div className="flex items-center my-3 w-1/3">
                    <img
                      src={media}
                      alt={description}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = 'https://wallet.testnet.near.org/failed_to_load.3a5f0340.svg';
                      }}
                    />
                  </div>
                  <div className="flex items-center w-2/3 ml-1">
                    <div>
                      <p className="font-drukMedium text-[14px] text-[#3D3D3D]">{title}</p>
                      <p className="font-inter mb-2 text-[12px] text-[#3D3D3D]">{description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </Loader>
      </div>
    </div>
  );
};

export default NftLink;
