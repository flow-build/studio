import styled from 'styled-components'

export const Avatar = styled.div`
    align-items: center;
    display: flex;
`

export const AvatarImage = styled.div`
    border-radius: 50%;
    height: 40px;
    margin-right: 10px;
    overflow: hidden;
    width: 40px;

    & > img {
        width: 100%;
    }
`

export const AvatarName = styled.span`
    font-size: 1rem;
    font-weight: 600;
`