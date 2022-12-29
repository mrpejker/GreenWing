/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from 'next';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import ClaimForm from '../../features/claims/claim-form';
import { getDocFromFirebase } from '../../utils/firebase';

interface ClaimPageProps {
  event_id: number;
  strings: string[];
  isPrivate: boolean;
}
const ClaimPage: NextPage<ClaimPageProps> = ({ strings, isPrivate, event_id }) => {
  const { accountId } = useWalletSelector();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col w-full items-center mt-[120px] px-[20px]">
        {strings.map((claimString: string, index: number) => (
          <div key={index} className="flex flex-col w-full bg-white p-[20px] rounded-lg max-w-[600px] my-[40px]">
            <ClaimForm
              isPrivate={isPrivate}
              event_id={Number(event_id)}
              claimString={String(claimString)}
              account_id={accountId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

ClaimPage.getInitialProps = async ({ query }) => {
  const event_id = query.slug;
  const strings = query.strings;
  const res: any = await getDocFromFirebase('claims', String(event_id));

  return {
    event_id: Number(event_id),
    isPrivate: Boolean(res.isPrivate),
    strings: String(strings).split(','),
  };
};

export default ClaimPage;
