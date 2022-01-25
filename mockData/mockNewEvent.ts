export const mockNewEvent = {
  title: 'New awesome Event',
  description: 'Very long description',
  end_date: new Date().getTime() * 1000,
  start_date: new Date().getTime() * 1000,
  quests: [
    {
      qr_string: 'Awesome QR String',
      nft_description: 'NFT Description',
      nft_title: 'NFT Title',
      nft_media: 'https://example.com/img.png',
    },
  ],
};
