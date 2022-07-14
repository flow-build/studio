import styled from 'styled-components'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'



export const Wrapper = styled(Box).attrs({
  sx: {
    gridArea: 'sidebar',
    background: (theme) => theme.palette.background.paper
  }
})``

export const NavList = styled(List).attrs({
  component: 'nav'
})``

export const MenuItem = styled(ListItemButton).attrs({
  
})``

export const MenuIcon = styled(ListItemIcon).attrs({
  
})``

export const MenuText = styled(ListItemText).attrs({

})``