export interface Quest {
  qr_string: string;
  nft_description: string;
  nft_title: string;
  nft_media: string;
}

export interface NewEvent {
  title: string;
  description: string;
  end_date: number;
  start_date: number;
  quests: Quest[];
}

export interface CheckIn {
  username: string;
  qr_string: string;
  timestamp: number;
  token_id: string;
  token_url: string;
}

export type EventStats = CheckIn[];
