const sh = require("shelljs");
const { EVENTS_CONTRACT, MASTER_ACCOUNT } = process.env;

const DELETE_BEFORE_DEPLOY = process.env.DELETE_BEFORE_DEPLOY === "true";
const CREATE_CONTRACT_ACCOUNT_BEFORE_DEPLOY = process.env.CREATE_CONTRACT_ACCOUNT_BEFORE_DEPLOY === "true";

// Initial contract account balance
let initialBalance = 21;

// Recreate account
if (DELETE_BEFORE_DEPLOY) {
  console.log('Recreate contract account: ', EVENTS_CONTRACT);
  sh.exec(`near delete ${LINKDREVENTS_CONTRACTOP_CONTRACT} ${MASTER_ACCOUNT}`);
  sh.exec(
    `near create-account ${EVENTS_CONTRACT} --masterAccount=${MASTER_ACCOUNT} --initialBalance ${initialBalance}`
  );

  // Copy credentials for later deploy
  sh.exec(`cp ~/.near-credentials/testnet/${EVENTS_CONTRACT}.json ./creds`);
} else if (CREATE_CONTRACT_ACCOUNT_BEFORE_DEPLOY) {
  console.log('Create contract account before deploy: ', EVENTS_CONTRACT);
  sh.exec(
    `near create-account ${EVENTS_CONTRACT} --masterAccount=${MASTER_ACCOUNT} --initialBalance ${initialBalance}`
  );

  // Copy credentials for later deploy
  sh.exec(`cp ~/.near-credentials/testnet/${EVENTS_CONTRACT}.json ./creds`);
}

// Deploy contract
sh.exec(
  `near deploy --wasmFile contracts/target/wasm32-unknown-unknown/release/events.wasm --accountId ${EVENTS_CONTRACT}`
);
sh.exec(`near call ${EVENTS_CONTRACT} new --accountId ${EVENTS_CONTRACT}`);

// Copy credentials for later deploy
sh.exec(`cp ~/.near-credentials/testnet/${EVENTS_CONTRACT}.json ./creds`);
