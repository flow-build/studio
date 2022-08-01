import styled from "styled-components";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { default as MuiDialog } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import { default as MuiStack } from "@mui/material/Stack";
import { default as MuiChip } from "@mui/material/Chip";

export const Wrapper = styled(Grid).attrs({
  container: true,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
})`
  height: calc(100% - 64px);
`;

export const Input = styled(TextField).attrs({
  id: "outlined-required",
  label: "Process Id",
  required: true,
  sx: { marginTop: 2 },
})``;

export const Dialog = styled(MuiDialog).attrs({
  fullWidth: true,
  maxWidth: "sm",
})``;

export const Title = styled(DialogTitle)``;

export const Content = styled(DialogContent)`
  display: flex;
  flex-direction: column;
`;

export const CancelButton = styled(Button).attrs({
  variant: "text",
})``;

export const SearchButton = styled(Button).attrs({
  variant: "contained",
})``;

export const DialogText = styled(DialogContentText)``;

export const Stack = styled(MuiStack)`
  direction: row;
`;

export const Chip = styled(MuiChip).attrs({
  variant: "outlined",
})``;
