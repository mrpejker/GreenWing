import { encode } from 'js-base64';
import { providers } from 'near-api-js';
import { isEnvProd } from '.';

const getConfig = (env: string) => {
  switch (env) {
    case 'production':
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
      };
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
      };
    case 'devnet':
      return {
        networkId: 'devnet',
        nodeUrl: 'https://rpc.devnet.near.org',
        walletUrl: 'https://wallet.devnet.near.org',
        helperUrl: 'https://helper.devnet.near.org',
      };
    case 'betanet':
      return {
        networkId: 'betanet',
        nodeUrl: 'https://rpc.betanet.near.org',
        walletUrl: 'https://wallet.betanet.near.org',
        helperUrl: 'https://helper.betanet.near.org',
      };
    case 'local':
      return {
        networkId: 'local',
        nodeUrl: 'http://localhost:3030',
        keyPath: `${process.env.HOME}/.near/validator_key.json`,
        walletUrl: 'http://localhost:4000/wallet',
      };
    case 'test':
    case 'ci':
      return {
        networkId: 'shared-test',
        nodeUrl: 'https://rpc.ci-testnet.near.org',
        masterAccount: 'test.near',
      };
    case 'ci-betanet':
      return {
        networkId: 'shared-test-staging',
        nodeUrl: 'https://rpc.ci-betanet.near.org',
        masterAccount: 'test.near',
      };
    default:
      throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
  }
};

export default getConfig;

// Check that near account exists (using near explorer).
// 'network' should be one of 'mainnet' or 'testnet'
export const checkNearAccount = async (nearid: any, network: string) => {
  try {
    const response = await fetch('https://explorer.' + network + '.near.org/accounts/' + nearid);
    const resText = await response.text();
    return !resText.includes('check if the account name');
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getState = async (contract_name: string, near_id: string) => {
  const network = isEnvProd ? 'mainnet' : 'testnet';
  //network config (replace testnet with mainnet or betanet)
  const url: string = 'https://rpc.' + network + '.near.org';
  const provider = new providers.JsonRpcProvider({ url });

  const args = { account_id: near_id };
  const args_base64 = encode(JSON.stringify(args));

  const rawResult: any = await provider.query({
    request_type: 'call_function',
    account_id: contract_name,
    method_name: 'nft_tokens_for_owner', //
    args_base64: args_base64,
    finality: 'optimistic',
  });

  // format result
  const res = JSON.parse(Buffer.from(rawResult.result).toString());
  // setNftTokens(res);
  return res;
};
