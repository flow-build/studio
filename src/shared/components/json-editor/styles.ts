import styled from "styled-components";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dracula";

export const Wrapper = styled(AceEditor).attrs({
  placeholder: "Digite o json",
  mode: "json",
  // theme: "dracula",
  name: "custom:parameters",
  // width: "100%",
  // fontSize: 16,
  // fontFamily: "Courier",
  setOptions: {
    // selectionStyle: "line",
    // highlightActiveLine: true,
    // highlightSelectedWord: true,
    // cursorStyle: "ace",
    // mergeUndoDeltas: true,
    // autoScrollEditorIntoView: true,
    // showPrintMargin: false,
    // showGutter: true,
    // wrapEnabled: true,
    // copyWithEmptySelection: true,
    // fixedWidthGutter: false,
    // wrapBehavioursEnabled: true,
    // scrollSpeed: 2,
    // dragDelay: 0,
    // dragEnabled: true,
    // focusTimeout: 0,
    // tooltipFollowsMouse: true,
    // overwrite: true,
    // newLineMode: true,
    // useWorker: false,
    // useSoftTabs: true,
    // tabSize: 4,
    // cursorStart: 1,
  },
})`
  /* *,
  button,
  input {
    font-family: unset !important;
  } */
  font-family: "Times New Roman";

  background-color: red;
`;
