import React from 'react'
import { Link } from 'react-router-dom'

import { useSidebar } from 'domain/dashboard/components/sidebar/hooks/useSidebar'

import * as S from './styles'

export const Sidebar: React.FC<{}> = () => {
  const sidebar = useSidebar()

  return (
    <S.Wrapper>
      <S.NavList>
        {sidebar.menuItems.map((menuItem, index) => (
          <Link to="" key={index.toString()}>
            <S.MenuItem>
              <S.MenuIcon>{menuItem.icon}</S.MenuIcon>
              <S.MenuText>{menuItem.name}</S.MenuText>
            </S.MenuItem>
          </Link>
        ))}
      </S.NavList>
    </S.Wrapper>
  )
}