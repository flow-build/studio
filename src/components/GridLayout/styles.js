import styled, { css } from 'styled-components'

export const GridLayout = styled.div`
    display: grid;
    grid-template-columns: 320px calc(100% - 320px);
    grid-template-areas: "sidebar content";
    height: 100vh;
    max-width: 100%;
`

export const Content = styled.div`
    ${({ theme }) => css`
        display: flex;
        grid-area: content;
        height: fit-content;
        padding: ${theme.spacings.xsmall};
    `}
`