/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import { Account, providers } from 'near-api-js';
import { isEnvProd } from '../../utils';

const AuthPage: NextPage = () => {
  const { selector, modal, accountId } = useWalletSelector();

  const handleAuth = async () => {
    modal.show();
  };
  const getAccount = useCallback(async (): Promise<Account | null> => {
    if (!accountId) {
      return null;
    }

    const { network } = selector.options;
    const provider: any = new providers.JsonRpcProvider({ url: network.nodeUrl });

    return provider
      .query({
        request_type: 'view_account',
        finality: 'final',
        account_id: accountId,
      })
      .then((data: any) => ({
        ...data,
        account_id: accountId,
      }));
  }, [accountId, selector.options]);

  useEffect(() => {
    const signOut = async () => {
      const wallet = await selector.wallet();

      wallet.signOut();
    };
    getAccount().then(() => {
      if (accountId) {
        window.location.href = `unitydl://mylink?${accountId}`;
        // TODO: invent convinient way
        signOut();
      }
    });
  }, [accountId, getAccount, selector]);
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="text-center">
        {!isEnvProd && (
          <div>
            <Link href="unitydl://mylink?caesai.testnet" passHref={true}>
              <span className="inline-block px-6 py-2.5 bg-zinc-300 text-black hover:text-zinc-300 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-600 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out">
                Without Sign In
              </span>
            </Link>
          </div>
        )}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleAuth}
            className="inline-block px-6 py-2.5 bg-zinc-300 text-black hover:text-zinc-300 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-600 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
