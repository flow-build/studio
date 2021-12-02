import styled, { css } from 'styled-components'

export const ListItem = styled.li`
    ${({ theme }) =>  css`
        border-top: 1px ${theme.colors.grayLight} solid;
        padding: ${theme.spacings.xsmall};

        &:last-child {
            border-bottom: 1px ${theme.colors.grayLight} solid;
        }
    `}
`