import styled from 'styled-components'

export const ProfileMenu = styled.div`
    align-items: center;
    border-bottom: 1px solid #dedee4;
    display: flex;
    padding: 20px;

    &:hover {
        background: #fafafb;
    }

    & > svg {
        font-size: 1.5rem;
        margin-right: 20px;
    }

    &:last-child {
        border-bottom-color: transparent;
    }
`

export const Content = styled.span`

`