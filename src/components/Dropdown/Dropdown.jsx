import React, { useState } from 'react'

import * as S from './styles'

const Dropdown = ({ children, Icon, badge, Toogle, Footer }) => {
    const [active, toogleActive] = useState(false)

    const handleToogleActive = () => toogleActive(!active)

    return (
        <S.Dropdown>
            <S.Button type="button" onClick={handleToogleActive}>
                {Icon}
                {
                    badge && (
                        <S.Badge>{badge}</S.Badge>
                    )
                }
                {Toogle}
            </S.Button>

            <S.Content className={active ? 'active' : ''}>
                {children}
                {Footer}
            </S.Content>
        </S.Dropdown>
    )
}

export default Dropdown