import styled from "styled-components";


import Box from "@mui/material/Box";
import DialogContentText from "@mui/material/DialogContentText";

import { Button } from "shared/components/button";
import { InputText } from "shared/components/input-text";

export const Form = styled(Box).attrs({
  component: "form",
})``;

export const Input = styled(InputText).attrs({
  fullWidth: true,
  required: true,
  sx: { mb: 2 },
})``;

export const Text = styled(DialogContentText)``;

export const SubmitButton = styled(Button).attrs({
  type: "submit",
  variant: "contained",
  title: "Sign up",
})`
  width: 6rem;
  height: 3.5rem;
`;

export const SubmitContainer = styled.div`
  display: flex,
  flex: 1,
  alignItems: center,
  justifyContent: center,
`;