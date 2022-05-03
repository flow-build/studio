import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material/styles';

import { Content } from 'shared/components/content'
import { Header } from 'pages/dashboard/components/header'
import { Sidebar } from 'pages/dashboard/components/sidebar'


import * as S from './styles'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const Dashboard: React.FC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const onMenuClick = () => {
    setMenuIsOpen(!menuIsOpen)
  }

  return (
    <S.Wrapper>
      <Header isOpen={menuIsOpen} onMenuClick={onMenuClick} />

      <Sidebar isOpen={menuIsOpen} />

      <Content padding={2}>
        <DrawerHeader />
        <Outlet />
      </Content>
    </S.Wrapper>
  )
}
