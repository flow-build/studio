import styled from 'styled-components'

import Box from '@mui/material/Box'
import MuiAvatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import LogoUrl from 'assets/images/flowbuildstudio_bg_dark.png'

export const Wrapper = styled(Box).attrs({
  sx: {
    gridArea: 'header',
    background: (theme) => theme.palette.background.paper,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    pl: '10px',
    pr: '10px'
  }
})``

export const Logo = styled.img.attrs({
  src: LogoUrl,
  alt: "Flowbuild Studio Logo"
})`
  width: 180px;
  cursor: pointer;
`;

export const Avatar = styled(MuiAvatar)`
cursor: pointer;
`;

export const MenuList = styled(Menu)``;

export const MenuItemList = styled(MenuItem).attrs({
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  textOverflow: 'ellipsis'
})``;