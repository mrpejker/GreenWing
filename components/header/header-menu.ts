import { WebappURLS } from '../../constants/webapp-urls';

export const navMenuItems = [
  {
    url: WebappURLS.ABOUT_URL,
    title: 'About vSelf',
  },
  {
    title: 'Resources',
    submenu: true,
  },
  {
    title: 'Products',
    submenu: true,
  },
  {
    url: WebappURLS.CONTACT_URL,
    title: 'Contacts',
  },
];

export const subMenuItems: any = {
  Products: [
    {
      url: WebappURLS.ONBOARD_URL,
      title: 'ONBOARDING TO NEAR',
    },
    {
      url: WebappURLS.ADD_URL,
      title: 'CREATE COLLECTION',
    },
    {
      url: WebappURLS.PRODUCTS_URL,
      title: 'COLLECTION DASHBOARD',
    },
    {
      url: WebappURLS.PROFILE_URL,
      title: 'VRANDA',
    },
  ],
  Resources: [
    {
      url: WebappURLS.FAQ_URL,
      title: 'FAQ',
    },
    {
      url: WebappURLS.ACADEMY_URL,
      title: 'VSELF ACADEMY',
    },
    {
      // url: WebappURLS.DOCUMENTS_URL,
      url: 'https://vself-project.gitbook.io/vself-project-documentation/',
      title: 'DOCUMENTS',
    },
    {
      url: WebappURLS.BLOG_URL,
      title: 'BLOG',
    },
  ],
  Burger: [],
};

// export const webappMenuItems = [
//   {
//     url: WebappURLS.ADD_URL,
//     title: 'Add Event',
//   },
//   {
//     url: WebappURLS.PROFILE_URL,
//     title: 'Profile',
//   },
//   // {
//   //   url: WebappURLS.ONBOARD_URL,
//   //   title: 'Onboard',
//   // },
//   {
//     url: WebappURLS.PRODUCTS_URL,
//     title: 'Products',
//   },
// ];
