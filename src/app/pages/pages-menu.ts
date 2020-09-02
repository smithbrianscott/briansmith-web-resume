import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home',
    link: '/pages/home',
    home: true,
    
  },
  {
    title: 'Setings',
    icon: 'settings',
    link: '/pages/admin/settings',
  },
  {
    title: 'UI Features',
    icon: 'star-outline',
    expanded: true,
    children: [
      {
        title: 'editor',
        icon: 'edit-2-outline',
        link: '/pages/ui-features/editor',
      },
      {
        title: 'grid',
        icon: 'list-outline',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'modal',
        icon: 'browser-outline',
        link: '/pages/ui-features/modal',
      },
      {
        title: 'toaster',
        icon: 'message-square-outline',
        link: '/pages/ui-features/toaster',
      },
    ]
  }
];
