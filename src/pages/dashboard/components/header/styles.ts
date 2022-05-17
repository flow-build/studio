import styled from 'styled-components'

import MuiAvatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'

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
`

export const Avatar = styled(MuiAvatar)``