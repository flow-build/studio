import { Outlet } from 'react-router-dom'

import { Content } from 'shared/components/content'
import { Header } from 'pages/dashboard/components/header'
import { Sidebar } from 'pages/dashboard/components/sidebar'

import * as S from './styles'

export const Dashboard: React.FC = () => {
  return (
    <S.Wrapper>
      <Header />
      <Sidebar />
      <Content padding={2}>
        <Outlet />
      </Content>
    </S.Wrapper>
  );
}