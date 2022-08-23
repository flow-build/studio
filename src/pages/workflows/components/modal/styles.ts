import styled from 'styled-components'

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dracula";

import { Button } from 'shared/components/button';
import { Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';



export const ProcessDialog = styled(Dialog)``;
export const TitleDialog = styled(DialogTitle)``;
export const Content = styled(DialogContent)``;
export const Actions = styled(DialogActions)``;
export const SaveButton = styled(Button)``;
export const JsonEditor = styled(AceEditor).attrs({
    mode: "json",
    theme: "dracula",
    name: "custom:parameters",
    width: "100%",
    fontSize: 16,
    readOnly: false,
    setOptions: {
    showPrintMargin: false,
    showGutter: true,
    highlightActiveLine: true,
    wrapEnabled: true,
    copyWithEmptySelection: true,
    mergeUndoDeltas: true,
    fixedWidthGutter: true,
  },
})``;



