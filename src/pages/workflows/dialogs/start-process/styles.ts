import styled from "styled-components";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

import CloseIcon from "@mui/icons-material/Close";

import { IconButton } from "shared/components/icon-button";
import { JsonEditor } from "shared/components/json-editor";

import Form from "@rjsf/core";

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

export const BoxMessage = styled(Box).attrs({})`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormSchema = styled(Form).attrs({})`
  /* .form-control input {
    background: "white";
  } */

  /* *,
  button,
  input {
    border: 0;
    background: none;
    font-family: "Roboto", sans-serif;
  } */

  .btzZXO button,
  .btzZXO input {
    background: none;
  }
`;
