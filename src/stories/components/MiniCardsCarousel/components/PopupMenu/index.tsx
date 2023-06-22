import * as React from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { PopupMenuProps } from './types';

export const PopupMenu: React.FC<PopupMenuProps> = ({ items, ...props }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div {...props}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu id="long-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map((item) => (
          <MenuItem key={item.id} onClick={item.onClick}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
