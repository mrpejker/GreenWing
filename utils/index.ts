/* eslint-disable @typescript-eslint/no-var-requires */
const nacl = require('tweetnacl');
const { providers } = require('near-api-js');
const { encode } = require('js-base64');
import { connect, ConnectConfig, keyStores, KeyPair, Contract, WalletConnection } from 'near-api-js';
import { Endpoints } from '../constants/endpoints';

// Mock data
import { mockUserAccount } from '../mockData/mockUserAccount';

const provider = new providers.JsonRpcProvider(Endpoints.TESTNET_RPC_ENDPOINT_URI);
// const keyStore = typeof window !== 'undefined' ? new keyStores.BrowserLocalStorageKeyStore() : undefined;

export const getContractState = async (methodName: string): Promise<boolean> => {
  try {
    const request = {
      request: '{}',
    };
    const encodedText = encode(JSON.stringify(request));
    const rawResult = await provider.query({
      request_type: 'call_function',
      account_id: Endpoints.TESTNET_CONTRACT_URI,
      method_name: methodName,
      args_base64: encodedText,
      finality: 'optimistic',
    });
    // format result
    const result = JSON.parse(Buffer.from(rawResult.result).toString());
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getRandomHashString = (): string => {
  const randomBytes = nacl.randomBytes(64);
  return Array.from(randomBytes, function (byte: number) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};

export const getNearWallet = async () => {
  const config: ConnectConfig = {
    networkId: 'testnet',
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    headers: {},
  };
  const near = await connect(config);
  const wallet = new WalletConnection(near, '');
  const accountId = wallet.getAccountId();
  const isSignedIn = wallet.isSignedIn();

  const signOut = () => {
    wallet.signOut();
  };

  const signIn = () => {
    wallet.requestSignIn({ contractId: Endpoints.TESTNET_CONTRACT_URI });
  };

  return { wallet, accountId, isSignedIn, signOut, signIn };
};

export const getNearAccountAndContract = async (account_id: string): Promise<any> => {
  const config: ConnectConfig = {
    networkId: 'testnet',
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    headers: {},
  };
  const near = await connect(config);

  const account = await near.account(account_id);

  const contract = new Contract(
    account, // the account object that is connecting
    Endpoints.TESTNET_CONTRACT_URI,
    {
      // name of contract you're connecting to
      viewMethods: ['is_active', 'get_actions', 'get_event_data', 'get_event_stats'], // view methods do not change state but usually return a value
      changeMethods: ['start_event', 'stop_event'], // change methods modify state
    }
  );

  return { account, contract };
};

export const getNftTokens = async (account_id: string): Promise<any[]> => {
  try {
    const request = { account_id };
    const encodedText = encode(JSON.stringify(request));

    const rawResult = await provider.query({
      request_type: 'call_function',
      account_id,
      method_name: 'nft_tokens_for_owner',
      args_base64: encodedText,
      finality: 'optimistic',
    });

    // format result
    const res = JSON.parse(Buffer.from(rawResult.result).toString());
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const formatTimeStampToLocaleDateString = (timestamp: number) => {
  return new Date(timestamp / 1000000).toLocaleDateString();
};

export const formatTimeStampToLocaleTimeString = (timestamp: number) => {
  return new Date(timestamp / 1000000).toLocaleTimeString();
};
