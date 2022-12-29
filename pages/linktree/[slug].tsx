/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { getDocFromFirebase } from '../../utils/firebase';
import ProfileComponent from '../../features/profile';
import LinkList from '../../features/profile/link-list';
import NftList from '../../features/profile/nft-list';
import Loader from '../../components/loader';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const APIURL = 'https://api.thegraph.com/subgraphs/name/ilerik/near-social';
const queryProfile = `
query GetAccount($id: ID!) {
  accounts(id: $id) {
    id
    data
  }
}
`;

interface LinktreePageProps {
  profile: any;
  nearid: string;
}

const LinktreePage: NextPage<LinktreePageProps> = ({ profile, nearid }) => {
  return (
    <div className="flex justify-center items-center pt-[125px]">
      <ProfileComponent profile={profile} nearid={nearid} />
    </div>
  );
};

// Get data from Indexer
export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const nearid = query.slug as string;
  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  });
  const variables = { id: nearid };
  const profile = await client
    .query({
      query: gql(queryProfile),
      variables,
    })
    .then((data: any) => {
      const vself = JSON.parse(data.data.accounts.filter((acc: any) => acc.id == nearid)[0].data).data[nearid!].vself;

      vself.links = Object.values(vself.links);
      vself.nfts = Object.values(vself.nfts);
      return vself;
    })
    .catch((err: any) => {
      console.log('Error fetching data: ', err);
      return {};
    });

  return {
    props: {
      profile,
      nearid: String(nearid),
    },
  };
};

// Firebase
// export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
//   const nearid = query.slug;
//   const profile = await getDocFromFirebase('users', String(nearid));
//   return {
//     props: {
//       profile,
//       nearid: String(nearid),
//     },
//   };
// };

export default LinktreePage;
