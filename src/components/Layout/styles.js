import styled from 'styled-components'

export const Layout = styled.div`
    display: grid;
    grid-template-areas: 
        "header header"
        "sidebar content";
        grid-template-columns: 280px calc(100% - 280px);
        grid-template-rows: 70px calc(100vh - 70px);
    max-width: 100%;
    min-height: 100vh;
    overflow: hidden;
`

export const Content = styled.div`
    grid-area: content;
    padding: 10px;
    overflow-y: scroll;
`