/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { getDocFromFirebase } from '../../utils/firebase';
import ProfileComponent from '../../features/profile';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import NotAuthorizedBlock from '../../components/not-authorized';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

interface formState {
  name: string;
  bio: string;
  links: any[];
  nfts: any[];
}

const initialFormState = {
  name: '',
  bio: '',
  links: [],
  nfts: [],
};

const APIURL = 'https://api.thegraph.com/subgraphs/name/ilerik/near-social';
const query = `
  query GetAccount($id: ID!) {
    accounts(id: $id) {
      id
      data
    }
  }
`;

const ProfilePage: NextPage = () => {
  const [profile, setProfile] = useState<any>(null);
  const { accountId } = useWalletSelector();

  // useEffect(() => {
  //   const initProfile = async () => {
  //     try {
  //       const result = await getDocFromFirebase('users', String(accountId));
  //       setProfile(result);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   initProfile();
  // }, [accountId]);

  useEffect(() => {
    const initProfile = async () => {
      try {
        const client = new ApolloClient({
          uri: APIURL,
          cache: new InMemoryCache(),
        });
        const variables = { id: accountId };
        try {
          const { data } = await client.query({ query: gql(query), variables });
          const vself = JSON.parse(data.accounts.filter((acc: any) => acc.id == accountId)[0].data).data[accountId!]
            .vself;

          vself.links = vself.links ? Object.values(vself.links) : [];
          vself.nfts = vself.nfts ? Object.values(vself.nfts) : [];
          setProfile(vself ? { ...initialFormState, ...vself } : initialFormState);
        } catch (err) {
          console.log('Error fetching data: ', err);
        }
      } catch (err) {
        console.log(err);
      }
    };
    initProfile();
  }, [accountId]);

  if (!accountId) {
    return (
      <div className="flex justify-center min-h-screen items-center p-[20px]">
        <div className="w-full max-w-[1240px] px-[20px] py-[40px] bg-white rounded-xl">
          <div className="w-full max-w-[1080px] mx-auto">
            <NotAuthorizedBlock />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center pt-[125px]">
      <ProfileComponent profile={profile} nearid={accountId} isEditing={true} />
    </div>
  );
};

export default ProfilePage;
