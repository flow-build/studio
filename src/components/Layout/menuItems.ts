import { AccountTreeIcon, SchemaIcon, SettingsIcon } from 'shared/icons';
import { MenuItemProps } from 'stories/components/Menu/types';

export const menuItems: MenuItemProps[] = [
  {
    id: '1',
    redirectLink: '/workflows',
    title: 'Workflows',
    icon: {
      redirectLink: '/workflows',
      icon: AccountTreeIcon
    }
  },
  {
    id: '2',
    redirectLink: '/nodes',
    title: 'Nodes',
    icon: {
      redirectLink: '/nodes',
      icon: SchemaIcon
    }
  },
  {
    id: '3',
    redirectLink: '/settings',
    title: 'Settings',
    icon: {
      redirectLink: '/settings',
      icon: SettingsIcon
    }
  }
];
