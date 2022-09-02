import styled from "styled-components";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

import CloseIcon from "@mui/icons-material/Close";

import { IconButton } from "shared/components/icon-button";
import { JsonEditor } from "shared/components/json-editor";

export const Wrapper = styled(Dialog).attrs({
  "aria-labelledby": "Confirmation",
  "aria-describedby": "Confirm action",
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

export const Content = styled(DialogContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
`;

export const Editor = styled(JsonEditor)``;

export const ActionsContainer = styled(DialogActions)``;

export const CancelButton = styled(Button).attrs({
  size: "small",
})``;

export const OkButton = styled(Button).attrs({
  autoFocus: true,
  variant: "contained",
  size: "small",
})``;

export const Loading = styled(CircularProgress).attrs({
  color: "inherit",
  size: "1.3rem",
})``;
