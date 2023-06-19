import diagramCSS from "bpmn-js/dist/assets/diagram-js.css";
import bpmnFontCSS from "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  ${diagramCSS}
  ${bpmnFontCSS}

  .djs-palette {
    border: unset !important;
  }

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
    background-color: #151521;

    overflow: hidden;
  }

  *, button, input {
    border: 0;
    background: none;
  }

  a {
    color: unset;
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    height: 5px;
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
