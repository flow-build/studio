import { Outlet } from 'react-router-dom'

import { Content } from 'shared/components/content'
import { Header } from 'pages/dashboard/components/header'
import { Sidebar } from 'pages/dashboard/components/sidebar'

import * as S from './styles'


import { styled } from '@mui/material/styles';
import { useState } from 'react'

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

  const handleDrawerOpen = () => {
    setMenuIsOpen(true);
  };

  const handleDrawerClose = () => {
    setMenuIsOpen(false);
  };

  return (
    <S.Wrapper>
      <Header isOpen={menuIsOpen} onMenuClick={handleDrawerOpen} />

      <Sidebar isOpen={menuIsOpen} onClose={handleDrawerClose} />

      <Content padding={2}>
        <DrawerHeader />
        <Outlet />
      </Content>
    </S.Wrapper>
  )
  /* return (
    <S.Wrapper>
      <Header />
      <Sidebar />
      <Content padding={2}>
        <Outlet />
      </Content>
    </S.Wrapper>
  ); */
}