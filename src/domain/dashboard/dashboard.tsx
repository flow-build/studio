import { Outlet } from 'react-router-dom'

import { Content } from 'domain/dashboard/components/content'
import { Header } from 'domain/dashboard/components/header'
import { Sidebar } from 'domain/dashboard/components/sidebar'

import * as S from './styles'

export const Dashboard: React.FC = () => {
  return (
    <S.Wrapper>
      <Header />
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </S.Wrapper>
  );
}