// First, import some helper libraries. `shelljs` is included in the
// devDependencies of the root project, which is why it's available here. It
// makes it easy to use *NIX-style scripting (which works on Linux distros,
// macOS, and Unix systems) on Windows as well.
const sh = require("shelljs");
const fs = require('fs');

const contractName = process.env.CONTRACT_NAME || fs.readFileSync('./neardev/dev-account').toString();
const masterAccount = process.env.MASTER_ACCOUNT || fs.readFileSync('./neardev/dev-account').toString();

// Contructor call
const initCmd = `near call ${contractName} new --accountId ${contractName}`;

// Cashback
sh.exec(`near send ${contractName} ${masterAccount} 100`);

// Copy credentials for later use
sh.exec(`cp ~/.near-credentials/testnet/${contractName}.json ./creds`);

// Execute the build command, storing exit code for later use
const { code } = sh.exec(initCmd);

// Assuming this is compiled from the root project directory, link the compiled
// contract to the `out` folder –
// When running commands like `near deploy`, near-cli looks for a contract at
// <CURRENT_DIRECTORY>/out/main.wasm
if (code === 0) {
  console.log("Init successfull");
}