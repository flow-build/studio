import styled from "styled-components";

import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";

import { JsonEditor } from "shared/components/json-editor";
import { InputText } from "shared/components/input-text";

import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv6";

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

export const OkButton = styled(Button).attrs({
  autoFocus: true,
  variant: "contained",
  size: "small",
})``;

export const FormSchema = styled(Form).attrs({
  validator,
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
  width: 25rem;
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
