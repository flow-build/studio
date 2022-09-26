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
import { InputText } from "shared/components/input-text";

import CircularProgress from "@mui/material/CircularProgress";

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

export const Text = styled(DialogContentText)`
  width: 26rem;
`;

export const Content = styled(DialogContent)`
  display: flex;
  flex-direction: column;
`;

export const BoxContent = styled(Box).attrs({})`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Editor = styled(JsonEditor)``;

export const ContainerInputShema = styled(Box)``;

export const ContainerEditorInputShema = styled(Box)``;

export const ActionsContainer = styled(DialogActions)``;

export const CancelButton = styled(Button).attrs({
  size: "small",
})``;

export const OkButton = styled(Button).attrs({
  autoFocus: true,
  variant: "contained",
  size: "small",
})`
  height: 2rem;
`;

export const BoxMessage = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormSchema = styled(Form).attrs({
  uiSchema: {
    "ui:submitButtonOptions": {
      norender: true,
    },
  },
})`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  width: 26rem;
  height: 100%;
`;

export const SmiteInput = styled(InputText)`
  width: 25rem;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
  margin-left: -2.9rem;
`;

export const SetManually = styled(Button).attrs({
  autoFocus: true,
  variant: "contained",
  size: "small",
})``;

export const SeeSchema = styled(Button).attrs({
  autoFocus: true,
  variant: "contained",
  size: "small",
})``;

export const Loading = styled(CircularProgress).attrs({
  color: "inherit",
})``;

export const TextOkButton = styled(DialogContentText)`
  font-weight: bold;
  font-size: small;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;
