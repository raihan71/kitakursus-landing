import { nnnFormEndpoint } from './service';

export const menus = [
  { titleKey: 'nav_home', link: '/' },
  { titleKey: 'nav_about', link: '/about' },
  { titleKey: 'nav_program', link: '#programID' },
  { titleKey: 'nav_contact', link: '#cta' },
];

export const menusBottom = [
  {
    section: 'Explore',
    menus: [
      {
        title: 'Programs',
        link: '#programID',
      },
      {
        title: 'Partnership',
        link: nnnFormEndpoint,
      },
      {
        title: 'Join Class',
        link: '',
      },
    ],
  },
  {
    section: 'Resources',
    menus: [
      {
        title: 'FAQ',
        link: '',
      },
      {
        title: 'Coming Soon',
      },
      {
        title: 'Coming Soon',
      },
    ],
  },
  {
    section: 'Support',
    menus: [
      {
        title: 'Help Center',
        link: '',
      },
      {
        title: 'Terms of Service',
        link: '',
      },
      {
        title: 'Privacy Policy',
        link: '',
      },
    ],
  },
  {
    section: 'Company',
    menus: [
      {
        title: 'About Us',
        link: '',
      },
      {
        title: 'Contact',
        link: '',
      },
      {
        title: 'Link',
      },
    ],
  },
];
