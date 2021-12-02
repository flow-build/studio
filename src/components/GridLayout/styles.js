import styled from 'styled-components'

export const GridLayout = styled.div`
    display: grid;
    grid-template-columns: 320px calc(100% - 320px);
    grid-template-areas: "sidebar content";
    height: 100vh;
    max-width: 100%;
`