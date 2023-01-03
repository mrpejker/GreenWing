import { WebappURLS } from '../../constants/webapp-urls';

export const navMenuItems = [
  {
    url: WebappURLS.ABOUT_URL,
    title: 'About GreenWing',
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
