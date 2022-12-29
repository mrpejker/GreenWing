/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import LinkIcon from '../../components/icons/LinkIcon';
import TrashIcon from '../../components/icons/TrashIcon';
import { isEnvProd, isValidHttpUrl } from '../../utils';
import { checkNearAccount } from '../../utils/near';

interface LinkButtonProps {
  title?: string;
  meta: any;
  index: number;
  btnCallback?: (index: number) => void;
  rmvCallback?: (index: number) => void;
  isEditing?: boolean;
  url?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ title, index, meta, btnCallback, rmvCallback, isEditing, url }) => {
  const [icon, setIcon] = useState<string>('');
  const validateUrl = useCallback(() => {
    const isValid = isValidHttpUrl(String(url));
    if (!isValid) {
      const fixedUrl = 'https://' + url;
      const anotherTry = isValidHttpUrl(fixedUrl);
      if (anotherTry) {
        return fixedUrl;
      }
    }
    return url;
  }, [url]);

  useEffect(() => {
    const checkFavIcon = async () => {
      const validatedUrl = validateUrl();
      const { data } = await axios.get('/api/parse-links?link=' + validatedUrl);
      setIcon(meta ? meta.icon : data.icon !== undefined ? data.icon : '');
    };
    checkFavIcon();
  }, [meta, setIcon, validateUrl]);

  const linkCallback = async () => {
    const network = isEnvProd ? 'mainnet' : 'testnet';
    if (!isEditing && url) {
      const isValid = isValidHttpUrl(url);
      if (!isValid) {
        try {
          const checkApiResponse = await fetch('/api/check-account?nearid=' + url);
          const isContractUrl = await checkApiResponse.json();
          if (!isContractUrl) {
            typeof window !== 'undefined' && window.open('https://' + url, '_blank')?.focus();
            return;
          }
          typeof window !== 'undefined' &&
            window.open('https://explorer.' + network + '.near.org/accounts/' + url, '_blank')?.focus();
          return;
        } catch (err) {
          console.log(err);
        }
      }
      console.log('link is valid', url);
      typeof window !== 'undefined' && window.open(url, '_blank')?.focus();
      return;
    }

    btnCallback && btnCallback(index);
  };

  const removeLink = () => {
    rmvCallback && rmvCallback(index);
  };

  return (
    <div className="flex flex-row items-center rounded-full relative z-0 my-2 px-[20px] py-[10px] bg-[#FFFFFF] hover:border-[#019FFF] border-[2px] border-[#F5F5F5] transition-colors ease-in text-[#000] overflow-auto">
      <button
        type="button"
        name="mainLink"
        className="flex flex-row w-full items-center overflow-auto"
        onClick={linkCallback}
      >
        {icon !== '' ? (
          <img style={{ maxWidth: 30, marginRight: 10 }} alt="" src={icon} />
        ) : (
          <div className="flex justify-center items-center bg-[#0000001a] rounded-full w-[30px] h-[30px] mr-[10px]">
            <LinkIcon />
          </div>
        )}
        <span className="font-inter text-[16px] z-0">{title}</span>
      </button>
      {isEditing && (
        <button type="button" className="absolute right-[20px] z-100 hover:text-[#c66969db]" onClick={removeLink}>
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

export default LinkButton;
