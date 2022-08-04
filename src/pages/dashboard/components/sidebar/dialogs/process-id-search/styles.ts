import styled from "styled-components";

import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MuiDialog from "@mui/material/Dialog";

import { InputText } from "shared/components/input-text";

export const Input = styled(InputText).attrs({
  id: "outlined-required",
  label: "Process Id",
  required: true,
  sx: { width: "100%" },
  margin: "dense",
})``;

export const Dialog = styled(MuiDialog).attrs({
  fullWidth: true,
  maxWidth: "sm",
})``;

export const Title = styled(DialogTitle)``;

export const Content = styled(DialogContent)``;

export const CancelButton = styled(Button).attrs({
  variant: "text",
})``;

export const SearchButton = styled(Button).attrs({
  variant: "contained",
})``;

export const DialogText = styled(DialogContentText)``;
