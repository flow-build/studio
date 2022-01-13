import React from 'react'
import { Link } from 'react-router-dom'

import * as S from './styles'

const ProfileMenu = ({ to, Icon, content, onClick }) => (
    <Link to={to} onClick={onClick}>
        <S.ProfileMenu>
            {Icon}
            <S.Content>{content}</S.Content>
        </S.ProfileMenu>
    </Link>
)

export default ProfileMenu