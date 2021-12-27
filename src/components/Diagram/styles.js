import styled, { css } from 'styled-components'

export const Diagram = styled.div`
    display: flex;
    height: calc(100vh - 1.6rem);
    flex-direction: column;
    min-width: 100%;
`

export const Canvas = styled.div`
    height: 85%;
    width: 100%;
`

export const SearchBar = styled.div`
    align-items: center;
    border-radius: 5px;
    display: flex;
    height: 40px;
    position: relative;
    overflow: hidden;

    & > svg {
        cursor: pointer;
        font-size: 1.5rem;
        right: 20px;
        position: absolute;
    }
`

export const Input = styled.input`
    ${({ theme }) => css`
        border: 2px solid ${theme.colors.grayLight};
        border-radius: 5px;
        font-size: 1rem;
        height: 100%;
        padding: 10px 60px 10px 20px;
        width: 100%;
        outline: 0;

        &:focus {
            border: 2px solid #2D77EF;
        }
    `}
`
