import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    max-height: 100vh; /* 100% do tamanho da tela */
    max-width: 100vw;
    height: 100%;
    width: 100%;
  }

  *, button, input {
    border: 0;
    background: none;
    font-family: "Roboto", sans-serif;
  }

  a {
    color: unset;
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
`;