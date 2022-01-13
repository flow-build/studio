import React from 'react'

import Routes from 'routes/Routes'
import { Header, Sidebar } from 'components'

import * as S from './styles'

const Layout = () => {
    return (
        <S.Layout>
            <Header />
            <Sidebar />
            <S.Content>
                <Routes />
            </S.Content>
        </S.Layout>
    )
}

export default Layout
