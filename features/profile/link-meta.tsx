/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface LinkMetaProps {
  icon?: string;
  title?: string;
  description?: string;
  image?: string;
}

const LinkMeta: React.FC<LinkMetaProps> = ({ icon, title, description, image }) => {
  return (
    <div>
      <div className="flex flex-row my-2">
        <img
          style={{ maxWidth: 30, marginRight: 10 }}
          alt=""
          src={icon}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = 'https://wallet.testnet.near.org/failed_to_load.3a5f0340.svg';
          }}
        />
        <span>{title}</span>
      </div>
      <p className="my-2">{description}</p>
      <img className="mb-2" src={image} alt="" />
    </div>
  );
};

export default LinkMeta;
