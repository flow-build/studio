import styled from 'styled-components'

export const Header = styled.header`
    background: #fff;
    display: grid;
    height: 100%;
    grid-area: header;
    grid-template-areas: "logo topnav";
    grid-template-columns: 320px auto;
    width: 100%;
`

export const LogoArea = styled.div`
    align-items: center;
    display: flex;
    grid-area: logo;
    justify-content: center;
    width: 100%;
`

export const TopNav = styled.div`
    align-items: center;
    display: flex;
    grid-area: topnav;
    height: auto;
    justify-content: end;
    padding: 0px 30px;
`