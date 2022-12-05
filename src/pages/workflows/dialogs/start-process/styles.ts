import styled from "styled-components";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import CloseIcon from "@mui/icons-material/Close";

import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv6";

import { IconButton } from "shared/components/icon-button";
import { InputText } from "shared/components/input-text";
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

export const Text = styled(DialogContentText)`
  width: 26rem;
`;

export const Content = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex: 1;

  min-height: 80vh;
  max-height: 80vh;
`;

export const BoxContent = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
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
  validator,
  uiSchema: {
    "ui:displayLabel": false,
    "ui:submitButtonOptions": {
      norender: true,
    },
  },
})`
  /* margin-top: 14px; */

  fieldset {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .control-label {
    display: inline-block;
    margin-top: 5px;
    font-family: sans-serif;
  }
`;

export const SmiteInput = styled(InputText).attrs({})`
  margin: 20px 0;
  width: calc(100% - 10px);
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
  size: 20,
  color: "inherit",
})``;

export const TextOkButton = styled.p`
  font-weight: bold;
  font-size: 0.8rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;
