import styled from "styled-components";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { JsonEditor } from "shared/components/json-editor";

import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

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

export const ActionsContainer = styled(DialogActions)``;

export const CancelButton = styled(Button).attrs({
  size: "small",
})``;

export const OkButton = styled(Button).attrs({
  autoFocus: true,
  variant: "contained",
  size: "small",
})``;

export const BoxMessage = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
