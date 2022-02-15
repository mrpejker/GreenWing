import { EventData } from '../models/Event';

export const mockEvent: EventData = {
  event_description: 'Test Event Description',
  event_name: 'Test Event',
  finish_time: 0,
  quests: [
    {
      qr_prefix: 'http://',
      reward_description: 'HTTP',
      reward_title: 'HTTP',
      reward_url: 'https://vself-dev.web.app/0.png',
    },
    {
      qr_prefix: 'https://',
      reward_description: 'HTTPS',
      reward_title: 'HTTPS',
      reward_url: 'https://vself-dev.web.app/1.png',
    },
    {
      qr_prefix: 'https://',
      reward_description: 'HTTPS',
      reward_title: 'HTTPS',
      reward_url: 'https://vself-dev.web.app/1.png',
    },
    {
      qr_prefix: 'https://',
      reward_description: 'HTTPS',
      reward_title: 'HTTPS',
      reward_url: 'https://vself-dev.web.app/1.png',
    },
    {
      qr_prefix: 'https://',
      reward_description: 'HTTPS',
      reward_title: 'HTTPS',
      reward_url: 'https://vself-dev.web.app/1.png',
    },
  ],
  start_time: 0,
};
