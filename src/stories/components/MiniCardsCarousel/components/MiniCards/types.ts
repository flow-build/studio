import { PopupMenuProps } from '../PopupMenu/types';

export interface MiniCardsProps {
  name: string;
  urlImg?: string;
  description: string;
  urlRedirect?: string;
  text?: string;
  popupMenu?: PopupMenuProps;
}
