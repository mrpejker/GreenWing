import { isEnvProd } from '.';
import { Endpoints } from '../constants/endpoints';

// Deposits Contract Settings
export const depositsContractName = isEnvProd ? Endpoints.DEPOSITS_MAINNET_CONTRACT_URI : Endpoints.DEPOSITS_TESTNET_CONTRACT_URI;
export const depositContractMethods = {
  // name of contract you're connecting to
  viewMethods: [
    'get_owner',
    'get_deposit_amount',
    'get_total_deposit',
  ], // view methods do not change state but usually return a value
  changeMethods: ['make_deposit', 'decrease_deposit', 'withdraw', 'withdraw_to_owner'], // change methods modify state
};

// Main Contract Settings
export const mainContractName = isEnvProd ? Endpoints.MAINNET_CONTRACT_URI : Endpoints.TESTNET_CONTRACT_URI;
// export const mainContractName = Endpoints.TESTNET_CONTRACT_URI;
export const mainContractMethods = {
  // name of contract you're connecting to
  viewMethods: [
    'version',
    'is_active',
    'get_actions',
    'get_event_actions',
    'get_event_data',
    'get_event_stats',
    'get_user_balance_extra',
    'get_ongoing_events',
    'get_ongoing_user_events',
  ], // view methods do not change state but usually return a value
  changeMethods: ['start_event', 'stop_event', 'checkin'], // change methods modify state
};
export const mainContractMethodsNew = {
  // name of contract you're connecting to
  viewMethods: [
    'version',
    'get_ongoing_events',
    'get_ongoing_user_events',
    'get_event_data',
    'get_event_stats',
    'get_user_balance',
    'get_event_actions',
  ], // view methods do not change state but usually return a value
  changeMethods: ['start_event', 'stop_event', 'checkin'], // change methods modify state
};

// LinkDrop Settings
export const linkDropName = isEnvProd ? 'near' : 'testnet';
export const linkDropMethods = {
  viewMethods: [''],
  changeMethods: ['create_account'],
};

export const ldName = Endpoints.LINKDROP_TESTNET_CONTRACT_URI;
export const ldMethods = {
  viewMethods: ['get_key_balance'],
  changeMethods: [
    'send',
    'claim',
    'create_account_and_claim',
    'create_account',
    'on_account_created',
    'on_account_created_and_claimed',
  ],
};
