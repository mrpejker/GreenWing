const express = require("express");
const http = require("http");
const nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");
const cors = require("cors");
const fs = require("fs");
const nearAPI = require("near-api-js");
const getConfig = require("./config/near");

// Load firebase credentials
const admin = require("firebase-admin");
const serviceAccount = require("./creds/vself-dev-firebase-adminsdk-ce1cl-abf7a3fba0.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vself-dev-default-rtdb.firebaseio.com",
});

// Instantiate server with WS support
const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: true,
  origins: ["*"],
});

// Load NEAR configuration
const { nodeUrl, networkId, contractName } = getConfig(process.env.NODE_ENV || 'development');
console.log("Connecting to smart-contract {}", contractName);

const {
  keyStores: { InMemoryKeyStore },
  Near,
  Account,
  Contract,
  KeyPair,
  utils: {
    format: { parseNearAmount },
  },
} = nearAPI;

// Load credentials
console.log(
  "Loading Credentials:\n",  
  `${process.env.HOME}/.near-credentials/${networkId}/${contractName}.json`
);
const credentials = JSON.parse(
  fs.readFileSync(    
    `${process.env.HOME}/.near-credentials/${networkId}/${contractName}.json`
  )
);
const keyStore = new InMemoryKeyStore();
keyStore.setKey(
  networkId,
  contractName,
  KeyPair.fromString(credentials.private_key)
);

// Open connection to NEAR cloud
const near = new Near({
  networkId,
  nodeUrl,
  deps: { keyStore },
});

const contractMethods = {
      changeMethods: ['checkin'],
      viewMethods: [],
    };

const { connection } = near;
const contractAccount = new Account(connection, contractName);
contractAccount.addAccessKey = (publicKey) =>
  contractAccount.addKey(
    publicKey,
    contractName,
    contractMethods.changeMethods,
    parseNearAmount("0.1")
  );

const contract = new Contract(contractAccount, contractName, contractMethods);

/// Business Logic

// Get status of current event
app.get("/status", async (req, res) => {
  let result;

  result = 2; // Number of rewards

  res.json(result);
});

app.get("/rewards", async (req, res) => {  
  // Rewards array
  const rewards = [
    { qr: "common", title: "Common", description: "Common Description"},
    { qr: "uncommon", title: "Uncommon", description: "Uncommon Description"},
  ];

  res.json(rewards);
});

app.get("/toss", async (req, res) => {
  let result = 'None';
  
  console.log(req.query);

  const username = req.query.nearid.slice(1, -1);
  const request = req.query.qr.slice(1, -1);
  const minting_cost = "100000000000000000000000";  
  
  result = await contract.checkin({args: { username, request }, gas: "300000000000000", amount: minting_cost }).catch( (err) => {  
    console.log(err);
    res.status(500).send();
  })

  res.json(result);
});

app.get("/start", async (req, res) => {
  let result;  

  res.json(result);
});

app.get("/stop", async (req, res) => {
  let result;  

  res.json(result);
});


/// Utils and WS auth
const getRandomHashString = () => {
  const randomBytes = nacl.randomBytes(64);
  return Array.from(randomBytes, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
};

// Websockets for auth
app.use(cors());
app.use(express.json());
app.options("*", cors());

// Map of hashStrings and socket ids of the client's browser
const hashStrings = new Map();
const sendHashStringToBrowser = (socket) => {
  const randomHashString = getRandomHashString();
  hashStrings.set(randomHashString, { socketID: socket.id });
  socket.emit("status", randomHashString);
};

io.on("connection", (socket) => {
  sendHashStringToBrowser(socket);

  socket.on("sendSignatureToServer", ({ hashString, signature, publicKey }) => {
    if (hashStrings.get(hashString) !== undefined) {
      const message = nacl.util.decodeUTF8(hashString);
      const uid = Buffer.from(publicKey).toString("hex");
      const isVerified = nacl.sign.detached.verify(
        message,
        signature,
        publicKey
      );
      if (isVerified) {
        admin
          .auth()
          .createCustomToken(uid)
          .then((customToken) => {
            // Send token back to client
            io.to(hashStrings.get(hashString).socketID).emit(
              "sendApprovalToClient",
              customToken
            );
          })
          .catch((error) => {
            console.log("Error creating custom token:", error);
          });
      }
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client with id ${socket.id} client disconnected`);
  });

  setInterval(() => {
    // Refreshing hashString and QR Code on client every 20 seconds
    hashStrings.delete(hashStrings);
    sendHashStringToBrowser(socket);
  }, 20000);
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
