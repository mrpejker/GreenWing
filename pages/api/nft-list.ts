import type { NextApiRequest, NextApiResponse } from 'next';

// Constants
const COVALENTHQ_API_KEY = 'ckey_40e49ac1e6744700b4742f6ddd4';

/// It returns list of NFT short data of the account `owner`.
/// The `chainid` is id of the chain (1 - ethereum, 131315164 - aurora) with contract `contract` that hosts NFTs
/// Request examples:
/// http://localhost:3000/api/nft-list?chainid=1&contract=0xe4605d46fd0b3f8329d936a8b258d69276cba264&owner=0x99c2e4708493b19baa116e26dfa0056f5a69a783
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Parse query
    const { chainid, contract, owner } = req.query;

    // Get all NFTs for `chainId` and `contractName`
    const apiGetNftList = `https://api.covalenthq.com/v1/${chainid}/tokens/${contract}/nft_token_ids/?key=${COVALENTHQ_API_KEY}`;
    const response = await fetch(apiGetNftList);
    const { data } = await response.json();
    const nftList = data.items;

    // Filter all tokens by `ownerAddress`
    const nftListOfOwner = [];
    for (let i = 0; i < nftList.length; i++) {
      const id = nftList[i].token_id;
      const apiGetTokenData = `https://api.covalenthq.com/v1/${chainid}/tokens/${contract}/nft_metadata/${id}/?key=${COVALENTHQ_API_KEY}`;
      const tokenResponse = await fetch(apiGetTokenData);
      const tokenData = await tokenResponse.json();
      const nftData = tokenData.data.items[0].nft_data[0];

      // Compare with `owner`
      const tokenOwner = nftData.owner_address;
      if (tokenOwner == owner) {
        const { name, description, image } = nftData.external_data;
        nftListOfOwner.push({ id, name, description, image });
      }
    }

    // Response
    res.status(200).json(nftListOfOwner);
  } catch (err) {
    console.log(err);
    res.status(500).json([]);
  }
}
