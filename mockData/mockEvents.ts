import { EventData } from '../models/Event';

export const mockEvent: EventData = {
  event_description: 'Test Event Description',
  event_name: 'Test Event',
  finish_time: 0,
  quests: [
    {
      qr_prefix: 'https://',
      reward_description: 'HTTPS',
      reward_title: 'HTTPS',
      reward_url: '/nft1.png',
    },
    {
      qr_prefix: 'https://',
      reward_description: 'HTTPS',
      reward_title: 'HTTPS',
      reward_url: '/nft2.png',
    },
    {
      qr_prefix: 'https://',
      reward_description: 'HTTPS',
      reward_title: 'HTTPS',
      reward_url: '/nft3.png',
    },
    {
      qr_prefix: 'https://',
      reward_description: 'HTTPS',
      reward_title: 'HTTPS',
      reward_url: '/nft4.png',
    },
  ],
  start_time: 0,
};
