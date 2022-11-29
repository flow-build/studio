import styled from "styled-components";

import Box from "@mui/material/Box";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { FormControl, OutlinedInput, InputLabel, CircularProgress } from "@mui/material";

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

export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LoginContainer = styled(Box).attrs({
  sx: { width: 320 },
})``;

export const RegisterButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RegisterButton = styled(Button).attrs({
  title: "No account? Sign up",
  variant: "text",
})``;

export const Form = styled(Box).attrs({
  component: "form",
})``;

export const Input = styled(InputText).attrs({
  label: "E-mail",
  name: "email",
  placeholder: "Type your e-mail",
  type: "text",
  fullWidth: true,
  required: true,
  sx: { mb: 2 },
})`
    height: 3.5rem;
`;

export const FormControlIcon = styled(FormControl).attrs({
  fullWidth: true,
})``;

export const Label = styled(InputLabel)``;

export const InputPassword = styled(OutlinedInput).attrs({
  label: "Password",
  name: "password",
  placeholder: "Type your password",
  fullWidth: true,
  required: true,
  sx: { mb: 2 },
})`
    width: 100%;
`;

export const Control = styled(FormControlLabel).attrs({
  label: "Remember me",
  sx: {
    '& .MuiSvgIcon-root': { fontSize: 20 },
    '& .MuiTypography-root': { fontSize: 14 }
  }
})`
`;

export const CheckBox = styled(Checkbox)``;

export const SubmitButton = styled(Button).attrs({
  type: "submit",
  variant: "contained",
  title: "Log in",
  fullWidth: true,
})`
  height: 3.5rem;
  postion: relattive;
`;

export const Loading = styled(CircularProgress).attrs({
  color: "inherit",
  size: "1.3rem",
})`
position: absolute;`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ForgotPasswordButton = styled(Button).attrs({
  type: "button",
  variant: "text",
  title: "Forgot your password?",
})``;
