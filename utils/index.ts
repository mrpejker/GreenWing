/* eslint-disable @typescript-eslint/no-var-requires */
const nacl = require('tweetnacl');
const { providers } = require('near-api-js');
const { encode, decode } = require('js-base64');
import { CONTRACT_NAME, TESTNET_RPC_ENDPOINT_URI } from '../constants/endpoints';

const provider = new providers.JsonRpcProvider(TESTNET_RPC_ENDPOINT_URI);

export const getState = async () => {
  try {
    const request = {
      request: '{}',
    };
    const encodedText = encode(JSON.stringify(request));
    const rawResult = await provider.query({
      request_type: 'call_function',
      account_id: CONTRACT_NAME,
      method_name: 'is_active',
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

export const getRandomHashString = () => {
  const randomBytes = nacl.randomBytes(64);
  return Array.from(randomBytes, function (byte: any) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};
