export type PopupMenuItem = {
  id: string;
  label: string;
  onClick?: () => void;
};

export type PopupMenuProps = {
  items: PopupMenuItem[];
};
