const sh = require("shelljs");
const fs = require('fs');
const { createHash } = require('crypto');

// SHA-256 hash
const hash = (msg) => {
  return createHash('sha256').update(msg).digest('hex');
}

const contractName = process.env.EVENTS_CONTRACT || fs.readFileSync('./neardev/dev-account').toString();
const masterAccount = process.env.MASTER_ACCOUNT || fs.readFileSync('./neardev/dev-account').toString();

// Start default event
const start_time = (new Date().getTime()) * 1000000; // 24.07
const end_time = start_time + 60 * 24 * 60 * 60 * 1000000000; // + 2 month

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

// Start both events the command
if (sh.exec(startEvent1).code === 0) {
  console.log("Test event 1 starts successfully");
}
if (sh.exec(startEvent2).code === 0) {
  console.log("Test event 2 starts successfully");
}

// Some tests
const event1_id = 3742138452; //u32 for now
const event2_id = 755591911; //u32 for now
sh.exec(`near view ${contractName} get_ongoing_events '{"from_index": 0, "limit": 100}' --accountId ${contractName}`);

// exit script with the same code as the build command
process.exit();
