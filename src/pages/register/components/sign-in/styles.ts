import styled from "styled-components";

import Box from "@mui/material/Box";
import Checkbox from '@mui/material/Checkbox';
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
  
  export const CheckBox = styled(Checkbox)``;
  
  export const Text = styled(DialogContentText)``;

  export const SubmitButton = styled(Button).attrs({
    type: "submit",
    variant: "contained",
    title: "Log in",
  })`
  width: 6rem;
  height: 3.5rem;
`;

export const ForgotPasswordButton = styled(Button).attrs({
  type: "button",
  variant: "text",
  title: "Forgot password?",
})``;