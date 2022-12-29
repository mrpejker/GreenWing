// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { map, distinctUntilChanged } from 'rxjs';
import { setupWalletSelector } from '@near-wallet-selector/core';
import type { WalletSelector, AccountState } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import { setupDefaultWallets } from '@near-wallet-selector/default-wallets';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupSender } from '@near-wallet-selector/sender';

import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import myNearWalletIconUrl from '@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png';
import { mainContractName } from '../utils/contract-methods';
import { isEnvProd } from '../utils';
import { NextPageContext } from 'next';

declare global {
  interface Window {
    selector: WalletSelector;
    modal: WalletSelectorModal;
  }
}

interface WalletSelectorContextValue {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accounts: Array<AccountState>;
  accountId: string | null;
}

export interface WalletCTX extends NextPageContext {
  accountId: string | null;
}

const WalletSelectorContext = React.createContext<WalletSelectorContextValue | null>(null);

export const WalletSelectorContextProvider: React.FC = ({ children }) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountState>>([]);
  const network = isEnvProd ? 'mainnet' : 'testnet';

  const init = useCallback(async () => {
    const _selector = await setupWalletSelector({
      network: network,
      debug: true,
      modules: [
        ...(await setupDefaultWallets()),
        setupNearWallet(),
        setupMyNearWallet({
          iconUrl: String(myNearWalletIconUrl),
        }),
        setupSender(),
      ],
    });
    const _modal = setupModal(_selector, { contractId: mainContractName });
    const state = _selector.store.getState();
    setAccounts(state.accounts);
    window.selector = _selector;
    window.modal = _modal;
    setSelector(_selector);
    setModal(_modal);
  }, [network]);

  useEffect(() => {
    console.count('use effect');

    init().catch((err) => {
      console.error(err);
      alert('Failed to initialise wallet selector');
    });
  }, [init]);

  useEffect(() => {
    if (!selector) {
      return;
    }

    const subscription = selector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        setAccounts(nextAccounts);
      });

    return () => subscription.unsubscribe();
  }, [selector]);

  if (!selector || !modal) {
    return null;
  }

  const accountId = accounts.find((account) => account.active)?.accountId || null;
  return (
    <WalletSelectorContext.Provider
      value={{
        selector,
        modal,
        accounts,
        accountId,
      }}
    >
      {children}
    </WalletSelectorContext.Provider>
  );
};

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext);

  if (!context) {
    throw new Error('useWalletSelector must be used within a WalletSelectorContextProvider');
  }

  return context;
}
