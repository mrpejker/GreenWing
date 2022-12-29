import type { NextPage } from 'next';
import MobileTopic from '../../components/faq/mobile';
import OverviewTopic from '../../components/faq/overview';
import SetupTopic from '../../components/faq/setup';
import FaqSidebar from '../../components/faq/sidebar';
import WebTopic from '../../components/faq/web';
import LinkBlock from '../../components/link-block';

interface TopicPageProps {
  topic: any;
}

const TopicPage: NextPage<TopicPageProps> = ({ topic }) => {
  const renderTopic = () => {
    switch (topic) {
      case 'web':
        return <WebTopic />;
      case 'mobile':
        return <MobileTopic />;
      case 'setup':
        return <SetupTopic />;
      case 'overview':
      default:
        return <OverviewTopic />;
    }
  };

  const breadCrumb = () => {
    switch (topic) {
      case 'web':
        return 'Web Application';
      case 'mobile':
        return 'Mobile Application';
      case 'setup':
        return 'Setting Up';
      case 'overview':
      default:
        return 'Platform Overview';
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center mt-[120px] text-[#3D3D3D]">
      <div className="max-w-[1240px] w-full mb-[30px] px-[20px]">
        <span className="text-[#B1B1B1] font-inter">
          Main / Resources / <b className="text-[#343434]">{breadCrumb()}</b>
        </span>
      </div>
      <div className="w-full h-[300px] bg-[url(/instrcover.png)] bg-no-repeat bg-center bg-cover rounded-[20px] max-w-[1240px] px-[20px]" />
      <div className="flex flex-col w-full max-w-[1240px] px-[20px] py-[40px]">
        <div className="flex flex-col md:flex-row-reverse items-start w-full justify-between">
          <FaqSidebar />

          <div className="flex md:basis-2/3 flex-col w-full">{renderTopic()}</div>
        </div>
        <LinkBlock />
      </div>
    </div>
  );
};

export async function getStaticProps({ params }: any) {
  const topic = params.slug;

  return {
    props: {
      topic,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'web' } },
      { params: { slug: 'mobile' } },
      { params: { slug: 'setup' } },
      { params: { slug: 'overview' } },
    ],
    fallback: true,
  };
}

export default TopicPage;
