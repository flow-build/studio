import React from 'react'
import { Link } from 'react-router-dom'

import LogoUrl from 'assets/images/horizontal-cor-padrao.png'

import * as S from './styles'

const Logo = () => (
    <S.Logo>
        <Link to="/">
            <S.Image src={LogoUrl} alt="Flowbuild" />
        </Link>
    </S.Logo>
)

export default Logo