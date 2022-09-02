import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

import CloseIcon from "@mui/icons-material/Close";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dracula";

import { IconButton } from "shared/components/icon-button";

export const Wrapper = styled(Dialog).attrs({
  "aria-labelledby": "Show properties",
  "aria-describedby": "Show all properties of shape",
  scroll: "paper",
  fullWidth: true,
  maxWidth: "lg",
})``;

export const BoxContent = styled(Box)`
  width: 17.4rem;
`;

export const Title = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseButton = styled(IconButton).attrs({
  icon: CloseIcon,
  ariaLabel: "close",
})``;

export const Text = styled(DialogContentText)``;

export const Content = styled(DialogContent)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Editor = styled(AceEditor).attrs({
  mode: "json",
  theme: "dracula",
  name: "custom:parameters",
  width: "100%",
  fontSize: 16,
  readOnly: true,
  setOptions: {
    showPrintMargin: false,
    showGutter: true,
    highlightActiveLine: true,
    copyWithEmptySelection: true,
    mergeUndoDeltas: true,
    fixedWidthGutter: true,
  },
})``;
