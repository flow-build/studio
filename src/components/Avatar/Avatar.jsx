import React from 'react'

import * as S from './styles'

const Avatar = ({ name, src, alt }) => (
    <S.Avatar>
        <S.AvatarImage>
            <img src={src} alt={alt || name} />
        </S.AvatarImage>
        <S.AvatarName>
            {name}
        </S.AvatarName>
    </S.Avatar>
)

export default Avatar