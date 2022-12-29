const sh = require("shelljs");
const fs = require('fs');
const { createHash } = require('crypto');

// SHA-256 hash
const hash = (msg) => {
  return createHash('sha256').update(msg).digest('hex');
}

const contractName = process.env.EVENTS_CONTRACT || fs.readFileSync('./neardev/dev-account').toString();
const masterAccount = process.env.MASTER_ACCOUNT || fs.readFileSync('./neardev/dev-account').toString();

// Start default event (time in 1 billionth of second)
const start_time = 1665132268000000000; // 07.10
const end_time = start_time + 30 * 24 * 60 * 60 * 1000000000; // + month
const pased_end_time = start_time + 60 * 1000000000; // + minute

const startEventCmd = `near call ${contractName} start_event '{"event_data": {
  "event_description":
  "vSelf launches a series of quests which will keep you motivated while you learn about our project and its place inside NEAR ecosystem",
  "event_name": "vSelf Onboarding Metabuild Quest",
  "finish_time": ${end_time},
  "quests": [{
    "qr_prefix_enc": "${hash('https://vself-dev.web.app/vself.apk')}",
    "qr_prefix_len": ${"https://vself-dev.web.app/vself.apk".length},
    "reward_description": "Welcome to the vSelf demo!",
    "reward_title": "vSelf: Welcome Badge",
    "reward_uri": "/nft1.png"
  },
  {
    "qr_prefix_enc": "${hash('You have registered in the NEAR community')}",
    "qr_prefix_len": ${"You have registered in the NEAR community".length},
    "reward_description": "You have registered in the NEAR community",
    "reward_title": "vSelf: NEAR User Badge",
    "reward_uri": "/nft2.png"
  },
  {
    "qr_prefix_enc": "${hash('Congrats! Now you know more about Web3')}",
    "qr_prefix_len": ${"Congrats! Now you know more about Web3".length},
    "reward_description": "Congrats! Now you know more about Web3",
    "reward_title": "vSelf: Early Adopter Badge",
    "reward_uri": "/nft3.png"
  },
  {
    "qr_prefix_enc": "${hash('Thank you <3 and see you soon!')}",
    "qr_prefix_len": ${"Thank you <3 and see you soon!".length},
    "reward_description": "Thank you <3 and see you soon!",
    "reward_title": "vSelf: Metabuidl Badge",
    "reward_uri": "/nft4.png"
  }],
"start_time": ${start_time}}}' --accountId ${masterAccount}`;

const startEvent1 = `near call ${contractName} start_event '{"event_data": {
  "event_description":
  "Test event",
  "event_name": "Test event 1",
  "finish_time": ${end_time},
  "quests": [{
    "qr_prefix_enc": "${hash('hello')}",
    "qr_prefix_len": ${"hello".length},
    "reward_description": "Welcome to the test!",
    "reward_title": "vSelf: Tester Badge",
    "reward_uri": "https://us.123rf.com/450wm/oksanastepova/oksanastepova1805/oksanastepova180500047/102167642-hello-unique-hand-drawn-nursery-poster-with-lettering-in-scandinavian-style-vector-illustration-.jpg?ver=6"
  },
  {
    "qr_prefix_enc": "${hash('goodbye')}",
    "qr_prefix_len": ${"goodbye".length},
    "reward_description": "Welcome to the test!",
    "reward_title": "vSelf: Tester Badge",
    "reward_uri": "https://www.wallquotes.com/sites/default/files/entr0054_01.jpg"
  }],
"start_time": ${start_time}}}' --accountId ${masterAccount}`;

const startEvent2 = `near call ${contractName} start_event '{"event_data": {
  "event_description":
  "Test event",
  "event_name": "Test event 2",
  "finish_time": ${end_time},
  "quests": [{
    "qr_prefix_enc": "${hash('cat')}",
    "qr_prefix_len": ${"cat".length},
    "reward_description": "You discovered a cat!",
    "reward_title": "vSelf: Tester Badge",
    "reward_uri": "https://i.pinimg.com/736x/98/16/ee/9816ee545b0f22fed08d3e120fdd48d7--jungle-cat-a-tiger.jpg"
  },
  {
    "qr_prefix_enc": "${hash('dog')}",
    "qr_prefix_len": ${"dog".length},
    "reward_description": "You discovered a dog!",
    "reward_title": "vSelf: Tester Badge",
    "reward_uri": "https://breed-assets.wisdompanel.com/dog/street-dog-india/Indian_Street_Dog_Color.png"
  },
  {
    "qr_prefix_enc": "${hash('possum')}",
    "qr_prefix_len": ${"possum".length},
    "reward_description": "You discovered a possum!",
    "reward_title": "vSelf: Tester Badge",
    "reward_uri": "https://i.pinimg.com/550x/43/e2/26/43e226270cbc24c2fd7efeff710da7d1.jpg"
  }],
"start_time": ${start_time}}}' --accountId ${masterAccount}`;

const startFinishedEvent = `near call ${contractName} start_event '{"event_data": {
  "event_description":
  "Test finished event",
  "event_name": "Test event",
  "finish_time": ${pased_end_time},
  "quests": [{
    "qr_prefix_enc": "${hash('hello')}",
    "qr_prefix_len": ${"hello".length},
    "reward_description": "Welcome to the test!",
    "reward_title": "vSelf: Tester Badge",
    "reward_uri": "https://us.123rf.com/450wm/oksanastepova/oksanastepova1805/oksanastepova180500047/102167642-hello-unique-hand-drawn-nursery-poster-with-lettering-in-scandinavian-style-vector-illustration-.jpg?ver=6"
  },
  {
    "qr_prefix_enc": "${hash('goodbye')}",
    "qr_prefix_len": ${"goodbye".length},
    "reward_description": "Welcome to the test!",
    "reward_title": "vSelf: Tester Badge",
    "reward_uri": "https://www.wallquotes.com/sites/default/files/entr0054_01.jpg"
  }],
"start_time": ${start_time}}}' --accountId ${masterAccount}`;


// Start all events
// if (sh.exec(startEvent1).code === 0) {
//   console.log("Test event 1 starts successfully");
// }
// if (sh.exec(startEvent2).code === 0) {
//   console.log("Test event 2 starts successfully");
// }
// if (sh.exec(startEventCmd).code === 0) {
//   console.log("Start default event successfull");
// }
// if (sh.exec(startFinishedEvent).code === 0) {
//   console.log("Start finished event successfull");
// }

// Some tests
const eventId = 309661982; //u32 for now 91725767
const eventId1 = 1887539744;
const eventId2 = 906254051;
const finishedEventId = 3502483670;
sh.exec(`near view ${contractName} get_ongoing_events '{"from_index": 0, "limit": 100}' --accountId ${contractName}`);
// sh.exec(`near view ${contractName} get_ongoing_user_events '{"account_id": "jkahfkjashdfs.testnet"}' --accountId ${contractName}`);

// Stop events tests
// sh.exec(`near call ${contractName} stop_event '{"event_id": ${eventId1}}' --accountId ${contractName}`);  // should fail
// sh.exec(`near call ${contractName} stop_event '{"event_id": ${eventId1}}' --accountId ${masterAccount}`);  // should stop

// Try to call checkin in finished event
// sh.exec(`near view ${contractName} get_event_data '{"event_id": ${finishedEventId}}'`);
// sh.exec(`near call ${contractName} checkin '{"event_id": ${finishedEventId}, "username": "jkahfkjashdfs.testnet", "request": "hello" }' --accountId ${masterAccount} --depositYocto 9000000000000000000000 --gas 300000000000000`);
// sh.exec(`near call ${contractName} checkin '{"event_id": ${finishedEventId}, "username": "jkahfkjashdfs.testnet", "request": "goodbye" }' --accountId ${masterAccount} --depositYocto 9000000000000000000000 --gas 300000000000000`);
// sh.exec(`near call ${contractName} checkin '{"event_id": ${eventId}, "username": "jkahfkjashdfs.testnet", "request": "You have" }' --accountId ${masterAccount} --depositYocto 1 --gas 300000000000000`);

// sh.exec(`near view ${contractName} get_event_stats '{"event_id": ${finishedEventId}}'`);
// sh.exec(`near view ${contractName} get_user_balance '{"event_id": ${finishedEventId}, "account_id": "jkahfkjashdfs.testnet"}'`);

// Try to call checkin in ongoing event
// sh.exec(`near call ${contractName} checkin '{"event_id": ${eventId}, "username": "jkahfkjashdfs.testnet", "request": "Ground control to major Tom" }' --accountId ${masterAccount} --depositYocto 9000000000000000000000 --gas 300000000000000`);
// sh.exec(`near call ${contractName} checkin '{"event_id": ${eventId}, "username": "ilerik.testnet", "request": "Congrats! Now you know more about Web3" }' --accountId "sergantche.testnet" --depositYocto 9000000000000000000000 --gas 300000000000000`);
// sh.exec(`near call ${contractName} checkin '{"event_id": ${eventId}, "username": "sergantche.testnet", "request": "You have registered in the NEAR community" }' --accountId ${masterAccount} --depositYocto 9000000000000000000000 --gas 300000000000000`);
// sh.exec(`near view ${contractName} get_event_stats '{"event_id": ${eventId}}'`);
// sh.exec(`near call ${contractName} stop_event '{"event_id": ${eventId}}' --accountId ${masterAccount}`);
// sh.exec(`near call ${contractName} checkin '{"event_id": ${eventId}, "username": "ilerik.testnet", "request": "You have registered in the NEAR community" }' --accountId ${masterAccount} --depositYocto 9000000000000000000000 --gas 300000000000000`);
// sh.exec(`near view ${contractName} get_ongoing_events '{"from_index": 0, "limit": 100}' --accountId ${contractName}`);
// sh.exec(`near view ${contractName} get_ongoing_events '{"from_index": 0, "limit": 100}' --accountId ${contractName}`);
// sh.exec(`near view ${contractName} get_user_balance '{"event_id": ${eventId}, "account_id": "ilerik.testnet"}'`);
// sh.exec(`near view ${contractName} get_user_balance '{"event_id": ${eventId}, "account_id": "sergantche.testnet"}'`);
// sh.exec(`near view ${contractName} get_event_actions '{"event_id": ${eventId}, "from_index": 0, "limit": 100}'`);

// Check token status
// sh.exec(`near view ${contractName} nft_token '{"token_id": "206241575:1:1661000383816756395:211"}'`);

// Try to transfer the token
// sh.exec(`near call events_v5.sergantche.testnet nft_transfer '{"receiver_id": "ilerik.testnet", "token_id": "206241575:1:1660998159049330033:11", "memo": "Go Team :)"}' --accountId sergantche.testnet --depositYocto 1`);

// exit script with the same code as the build command
process.exit();
