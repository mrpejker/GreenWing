/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import ActiveLink from '../../components/active-link';
import { mockNaomiPost, mockPostPreview } from '../../mockData/mockBlogPost';

export async function getServerSideProps() {
  const posts = await (
    await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@vSelf_Project')
  )?.json();
  const { items } = posts;
  return {
    props: {
      posts: [mockPostPreview, mockNaomiPost, ...items],
    },
  };
}

interface BlogProps {
  posts: any[];
}

const BlogPage: NextPage<BlogProps> = ({ posts }) => {
  return (
    <div className="flex flex-col justify-center items-center px-[20px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mb-[40px] mt-[150px] rounded-lg max-w-[1240px] text-black">
        {posts.map((post, index) => (
          <PostPreview key={index} {...post} />
        ))}
      </div>
      <div className="flex items-center justify-center w-full ">
        <div className="w-full max-w-[1240px] bg-[url(/lnd_bl2.png)] p-[20px] bg-no-repeat bg-center bg-cover rounded-lg">
          <div className="flex flex-col z-20 w-full max-w-[1040px] md:justify-between md:items-center mx-auto md:flex-row">
            <div className="flex md:mb-0 md:w-2/3 mb-[70px]">
              <h2 className="text-[25px] font-grotesk text-white uppercase ">
                check out our training <br /> programme on how to use <br /> the app
              </h2>
            </div>
            <div className="flex justify-center md:w-1/2">
              <ActiveLink
                href="/faq"
                className="self-center p-[20px] rounded-full w-auto py-2 bg-[#41F092] border-[#41F092] border-[1px] hover:bg-transparent transition-colors"
              >
                <span className="text-black hover:text-[#41F092]">Explore vSelf</span>
              </ActiveLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PostProps {
  title: string;
  link: string;
  thumbnail: string;
  description: string;
  categories: any[];
}

const PostPreview: React.FC<PostProps> = ({ title, link, thumbnail, description, categories }) => {
  const titleRef = useRef<HTMLAnchorElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.innerHTML = title;
    }
    if (descriptionRef.current) {
      // descriptionRef.current.innerHTML = description;
    }
    if (imgRef.current) {
      imgRef.current.style.backgroundImage = thumbnail;
    }
  }, [titleRef, title, descriptionRef, description, thumbnail]);
  return (
    <div className="grid cursor-pointer hover:shadow-lg flex-col sm:max-w-[300px] border-[#D9D9D9] border-[1px] rounded-lg p-[14px]">
      <div
        ref={imgRef}
        style={{ background: 'url(' + thumbnail + ') center no-repeat', backgroundSize: 'cover' }}
        className="sm:max-w-[260px] w-full h-[160px] rounded-lg mb-[4px]"
      />
      <p className="text-[#B1B1B1] mb-[4px]">{categories.join(' ')}</p>
      <a href={link} className="text-[#343434] hover:underline" ref={titleRef}></a>
      <p ref={descriptionRef}></p>
    </div>
  );
};

export default BlogPage;
