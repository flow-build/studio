import styled from "styled-components";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import CloseIcon from "@mui/icons-material/Close";

import { IconButton } from "shared/components/icon-button";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

export const Wrapper = styled(Dialog).attrs({
  "aria-labelledby": "Show process' info",
  "aria-describedby": "Show all process' info",
  scroll: "paper",
  fullWidth: true,
  maxWidth: "md",
})``;

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

export const Content = styled(DialogContent)``;

export const ActionsContainer = styled(DialogActions)``;

export const OkButton = styled(Button).attrs({
  autoFocus: true,
  variant: "contained",
  size: "small",
})``;

export const Editor = styled(AceEditor).attrs({
  mode: "javascript",
  theme: "github",
  name: "custom:parameters",
  width: "100%",
  fontSize: 16,
  readOnly: true,
  showPrintMargin: true,
  showGutter: true,
  highlightActiveLine: true,
  wrapEnabled: true,
})``;
