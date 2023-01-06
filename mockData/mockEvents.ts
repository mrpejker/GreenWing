import { EventData } from '../models/Event';
import { hash } from '../utils';

export const mockEvent: any = {
  event_description:
    'vSelf lauches a series of quests which will keep you motivated while you learn about our project and its place inside NEAR ecosystem',
  event_name: 'vSelf Onboarding Metabuild Quest',
  finish_time: new Date().getTime() * 1000000 + 30 * 24 * 60 * 60 * 1000000,
  start_time: new Date().getTime() * 1000000,
  quests: [
    {
      qr_prefix_enc: `${hash('https://vself-dev.web.app/vself.apk')}`,
      qr_prefix_len: 'https://vself-dev.web.app/vself.apk'.length,
      reward_description: 'Welcome to the vSelf demo!',
      reward_title: 'vSelf: Welcome Badge',
      reward_uri: '/nft1.png',
    },
    {
      qr_prefix_enc: `${hash('You have registered in the NEAR community')}`,
      qr_prefix_len: 'You have registered in the NEAR community'.length,
      reward_description: 'You have registered in the NEAR community',
      reward_title: 'vSelf: NEAR User Badge',
      reward_uri: '/nft2.png',
    },
    {
      qr_prefix_enc: `${hash('Congrats! Now you know more about Web3')}`,
      qr_prefix_len: 'Congrats! Now you know more about Web3'.length,
      reward_description: 'Congrats! Now you know more about Web3',
      reward_title: 'vSelf: Early Adopter Badge',
      reward_uri: '/nft3.png',
    },
    {
      qr_prefix_enc: `${hash('Thank you <3 and see you soon!')}`,
      qr_prefix_len: 'Thank you <3 and see you soon!'.length,
      reward_description: 'Thank you <3 and see you soon!',
      reward_title: 'vSelf: Metabuidl Badge',
      reward_uri: '/nft4.png',
    },
  ],
};

export const mockUserEvents = [
  [
    1887539744,
    {
      event_name: 'Test event 1',
      event_description: 'Test event',
      start_time: 1661940823124000000,
      finish_time: 1667124823124000000,
      quests: [
        {
          qr_prefix_enc: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
          qr_prefix_len: 5,
          reward_title: 'vSelf: Tester Badge',
          reward_description: 'Welcome to the test!',
          reward_uri:
            'https://us.123rf.com/450wm/oksanastepova/oksanastepova1805/oksanastepova180500047/102167642-hello-unique-hand-drawn-nursery-poster-with-lettering-in-scandinavian-style-vector-illustration-.jpg?ver=6',
        },
        {
          qr_prefix_enc: '82e35a63ceba37e9646434c5dd412ea577147f1e4a41ccde1614253187e3dbf9',
          qr_prefix_len: 7,
          reward_title: 'vSelf: Tester Badge',
          reward_description: 'Welcome to the test!',
          reward_uri: 'https://www.wallquotes.com/sites/default/files/entr0054_01.jpg',
        },
      ],
    },
    {
      participants: [],
      created_by: 'sergantche.testnet',
      created_at: 1661940825888278300,
      stopped_at: null,
      total_rewards: 0,
      total_users: 0,
      total_actions: 0,
    },
  ],
  [
    906254051,
    {
      event_name: 'Test event 2',
      event_description: 'Test event',
      start_time: 1661940823124000000,
      finish_time: 1667124823124000000,
      quests: [
        {
          qr_prefix_enc: '77af778b51abd4a3c51c5ddd97204a9c3ae614ebccb75a606c3b6865aed6744e',
          qr_prefix_len: 3,
          reward_title: 'vSelf: Tester Badge',
          reward_description: 'You discovered a cat!',
          reward_uri: 'https://i.pinimg.com/736x/98/16/ee/9816ee545b0f22fed08d3e120fdd48d7--jungle-cat-a-tiger.jpg',
        },
        {
          qr_prefix_enc: 'cd6357efdd966de8c0cb2f876cc89ec74ce35f0968e11743987084bd42fb8944',
          qr_prefix_len: 3,
          reward_title: 'vSelf: Tester Badge',
          reward_description: 'You discovered a dog!',
          reward_uri: 'https://breed-assets.wisdompanel.com/dog/street-dog-india/Indian_Street_Dog_Color.png',
        },
        {
          qr_prefix_enc: '0ddf8cbefa6ed1a5d0c71ea559734bcd2c6261bd3ae34cfba7a007859cb366e5',
          qr_prefix_len: 6,
          reward_title: 'vSelf: Tester Badge',
          reward_description: 'You discovered a possum!',
          reward_uri: 'https://i.pinimg.com/550x/43/e2/26/43e226270cbc24c2fd7efeff710da7d1.jpg',
        },
      ],
    },
    {
      participants: [],
      created_by: 'sergantche.testnet',
      created_at: 1661940832102460700,
      stopped_at: null,
      total_rewards: 0,
      total_users: 0,
      total_actions: 0,
    },
  ],
  [
    1187296838,
    {
      event_name: 'Another Test Event',
      event_description: 'Another Test Event Description',
      start_time: 1662444475030000000,
      finish_time: 1662530875030000000,
      quests: [
        {
          qr_prefix_enc: 'fbbc17ca091ca1b8d393ca74da1a935fd0c488756f0a14f77fc8cf2b38e7c171',
          qr_prefix_len: 7,
          reward_title: 'Certificate #1',
          reward_description: 'Hooray',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F6347e5ca932d135be5ab9cccac5b2950cfe0a4a6d235fc58176cb19dd1f64b52.PNG?alt=media&token=a5a406bc-61db-4f2f-9e8e-72cace8bf2db',
        },
        {
          qr_prefix_enc: 'd7e3406a69679ff35268ba7458496528538eb64b5272ffda6b35b75b03b5abce',
          qr_prefix_len: 7,
          reward_title: 'New Quest #2',
          reward_description: 'Hooray',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F2a3e693abd9781ae1596ed59ef48fa09fbb085641d57bf16d8e5f4bff0319449.PNG?alt=media&token=420b8ce5-935f-4633-9aba-8f5e13b37f52',
        },
      ],
    },
    {
      participants: [],
      created_by: 'caesai.testnet',
      created_at: 1662444546602733300,
      stopped_at: null,
      total_rewards: 0,
      total_users: 0,
      total_actions: 0,
    },
  ],
];

export const mockBarcelonaEvent: any = {
  event_description:
    'WOW3 meetup at ETH Barcelona is focusing on inclusivity and diversity in Web3 communities. For our guests, vSelf suggests an interactive experience, supported by our platform and prepared custom attendance certificates and NFT rewards.',
  event_name: 'ETH Barcelona NFTs',
  finish_time: 1657539102000000000,
  quests: [
    {
      qr_prefix_enc: 'https://vself.app/ethbarcelona?1',
      qr_prefix_len: 0,
      reward_description: 'Thank you for joining our event! Enjoy the kudos to WOW3 meetup participants',
      reward_title: 'WOW3 & vSelf Community',
      reward_uri: '',
    },
    {
      qr_prefix_enc: 'https://vself.app/ethbarcelona?2',
      qr_prefix_len: 0,
      reward_description: 'Glad to see you getting to the essence of things. All effort should be rewarded!',
      reward_title: 'Tech Deep Dive',
      reward_uri: '',
    },
    {
      qr_prefix_enc: 'https://vself.app/ethbarcelona?3',
      qr_prefix_len: 0,
      reward_description: 'Thank you for giving us feedback! We appreciate your contribution. ',
      reward_title: 'vSelf Supporter',
      reward_uri: '',
    },
    {
      qr_prefix_enc: 'https://vself.app/ethbarcelona?4',
      qr_prefix_len: 0,
      reward_description: 'Synergy between people makes things possible! Thank you for being a part of this journey. ',
      reward_title: 'Collaboration & Creativity',
      reward_uri: '',
    },
  ],
  start_time: 1656934302915000000,
};
