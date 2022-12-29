import React from 'react';
import Loader from '../../components/loader';
import LinkButton from './link-button';

type LinksData = {
  links: any[];
};

type LinkListProps = LinksData & {
  isEditing?: boolean;
  btnCallback?: (index: number) => void;
  updateForm: (fields: Partial<LinksData>) => void;
};

const LinkList: React.FC<LinkListProps> = ({ links, isEditing, btnCallback, updateForm }) => {
  const removeLink = (index: number) => {
    const newLinksArray = [...links];
    newLinksArray.splice(index, 1);
    updateForm({ links: newLinksArray });
  };
  return (
    <Loader is_load={links === undefined}>
      <>
        <h2 className="font-interMedium text-white text-[16px] mb-4">Links</h2>
        {links !== undefined &&
          links.map(({ title, meta, url }: any, index: number) => (
            <LinkButton
              key={index}
              index={index}
              title={title}
              url={url}
              meta={meta}
              isEditing={isEditing}
              btnCallback={btnCallback}
              rmvCallback={removeLink}
            />
          ))}
      </>
    </Loader>
  );
};

export default LinkList;
