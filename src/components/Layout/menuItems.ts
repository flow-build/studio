import { AccountTreeIcon, SchemaIcon, SettingsIcon, RecentActorsIcon, CompareArrowsIcon, IntegrationInstructionsIcon } from 'shared/icons';
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
    redirectLink: '/processes',
    title: 'Processes',
    icon: {
      redirectLink: '/processes',
      icon: RecentActorsIcon
    }
  },
  {
    id: '3',
    redirectLink: '/compare',
    title: 'Compare States',
    icon: {
      redirectLink: '/compare',
      icon: CompareArrowsIcon
    }
  },
  {
    id: '4',
    redirectLink: '/nodes',
    title: 'Nodes',
    icon: {
      redirectLink: '/nodes',
      icon: SchemaIcon
    }
  },
  {
    id: '5',
    redirectLink: '/specs',
    title: 'Specs',
    icon: {
      redirectLink: '/specs',
      icon: IntegrationInstructionsIcon
    }
  },
  {
    id: '6',
    redirectLink: '/settings',
    title: 'Settings',
    icon: {
      redirectLink: '/settings',
      icon: SettingsIcon
    }
  }
];
