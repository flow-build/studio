import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

    * {
        -webkit-tap-highlight-color: transparent;
        box-sizing: border-box;
        margin: 0;
        padding: 0
    }

    body {
        background: #f9f9f9;
        font-family: "Roboto", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        letter-spacing: 0.7px;
    }

    a {
        color: unset;
        text-decoration: none;
    }
`

export default GlobalStyle