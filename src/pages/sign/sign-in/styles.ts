import styled from "styled-components";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DialogContentText from "@mui/material/DialogContentText";

import { Button } from "shared/components/button";
import { InputText } from "shared/components/input-text";

export const Wrapper = styled(Grid).attrs({
  container: true,
  flexDirection: "column",
  sx: {
    height: "100vh",
    background: (theme) => theme.palette.background.default,
  },
})``;

export const LoginContainer = styled(Box).attrs({
  sx: { width: 320 },
})``;

export const LogoContainer = styled(Box).attrs({
  sx: {
    display: "flex",
    justifyContent: "center",
    mb: 4,
  },
})``;

export const Form = styled(Box).attrs({
  component: "form",
})``;

export const Input = styled(InputText).attrs({
  fullWidth: true,
  required: true,
  sx: { mb: 2 },
})``;

export const Text = styled(DialogContentText)``;

export const VersionContainer = styled(Box).attrs({
  sx: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: "10px",
    mb: 4,
  },
})``;
export const PrimaryButton = styled(Button)``;
