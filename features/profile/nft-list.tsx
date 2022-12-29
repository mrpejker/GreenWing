import React from 'react';
import NftLink from './nft-link';

type NFTData = {
  nfts: any[];
};

type NftListProps = NFTData & {
  btnCallback?: (index: number) => void;
  updateForm: (fields: Partial<NFTData>) => void;
  isEditing?: boolean;
  nearid?: string;
};

const NftList: React.FC<NftListProps> = ({ nfts, btnCallback, isEditing, nearid, updateForm }) => {
  const removeLink = (index: number) => {
    const newNftLinksArray = [...nfts];
    newNftLinksArray.splice(index, 1);
    updateForm({ nfts: newNftLinksArray });
  };
  return (
    <>
      {nfts !== undefined &&
        nfts.map(({ title, meta, url }: any, index: number) => (
          <NftLink
            key={index}
            title={title}
            meta={meta}
            url={url}
            index={index}
            btnCallback={btnCallback}
            rmvCallback={removeLink}
            isEditing={isEditing}
            nearid={nearid}
          />
        ))}
    </>
  );
};

export default NftList;
