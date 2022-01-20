interface Quest {
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
