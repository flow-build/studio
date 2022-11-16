import styled from "styled-components";

import Box from "@mui/material/Box";
import Checkbox from '@mui/material/Checkbox';
import DialogContentText from "@mui/material/DialogContentText";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Button } from "shared/components/button";
import { InputText } from "shared/components/input-text";
import { FormControl, OutlinedInput } from "@mui/material";

export const Form = styled(Box).attrs({
  component: "form",
})``;

export const InputPassword = styled(OutlinedInput).attrs({
  fullWidth: true,
  required: true,
  sx: { mb: 2 },
})`
    width: 100%;
`;

export const Input = styled(InputText).attrs({
  fullWidth: true,
  required: true,
  sx: { mb: 2 },
})`
    height: 3.5rem;
`;

export const FormControlIcon = styled(FormControl).attrs({
  fullWidth: true,
})``;

export const CheckBox = styled(Checkbox).attrs({

})``;

export const Text = styled(DialogContentText)``;

export const SubmitButton = styled(Button).attrs({
  type: "submit",
  variant: "contained",
  title: "Log in",
  fullWidth: true,
})`
  height: 3.5rem;
`;

export const Control = styled(FormControlLabel).attrs({
  label: "Remember me",
  sx: {
    '& .MuiSvgIcon-root': { fontSize: 20 },
    '& .MuiTypography-root': { fontSize: 14 }
  }
})`
`;

export const ForgotPasswordButton = styled(Button).attrs({
  type: "button",
  variant: "text",
  title: "Forgot your password?",
})``;


export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;