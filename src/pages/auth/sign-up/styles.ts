import styled from "styled-components";

import DialogContentText from "@mui/material/DialogContentText";
import { FormControl, OutlinedInput, InputLabel } from "@mui/material";

import { GridWrapper } from "pages/auth/components/grid-wrapper";

import { Button } from "shared/components/button";
import { InputText } from "shared/components/input-text";

export const Wrapper = styled(GridWrapper)``;

export const Input = styled(InputText).attrs({
  label: "E-mail",
  type: "text",
  name: "email",
  placeholder: "Type your e-mail",
  fullWidth: true,
  required: true,
  sx: { mb: 2 },
})``;

export const FormControlIcon = styled(FormControl).attrs({
  fullWidth: true,
})``;

export const Label = styled(InputLabel)``;

export const InputPassword = styled(OutlinedInput).attrs({
  fullWidth: true,
  required: true,
  sx: { mb: 2 },
})`
  width: 100%;
`;

export const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 5px;
  padding-bottom: 15px;
`;

export const PasswordItens = styled.div<{ isDisabled: boolean }>`
  background-color: ${({ isDisabled }) => (isDisabled ? "#1E4F9F" : "#252A41")};
  padding: 5px 10px;
  gap: 5px;
  border-radius: 100px;
  display: flex;
  align-items: center;

  transition: 0.2s background-color;
`;

export const Text = styled(DialogContentText)`
  font-size: 12px;
`;

export const SubmitContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 5px;

  margin: 40px 0 20px;
`;

export const SubmitButton = styled(Button).attrs({
  type: "submit",
  title: "Submit",
  variant: "contained",
  fullWidth: true,
})`
  height: 3.5rem;
`;

export const BackButton = styled(Button).attrs({
  type: "button",
  title: "Back",
  variant: "outlined",
  fullWidth: true,
})`
  height: 3.5rem;
`;
