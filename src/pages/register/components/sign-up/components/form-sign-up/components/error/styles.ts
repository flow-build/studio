import styled from "styled-components";

import DialogContentText from "@mui/material/DialogContentText";

import { Button } from "shared/components/button";

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled(DialogContentText)``;

export const OptionsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 5px;

  margin: 20px 0 20px;
`;

export const ForgotPasswordButton = styled(Button).attrs({
  title:"Forgot Password",
  variant: "contained",
  type: "button",
  fullWidth: true,
})`
  height: 3.5rem;
`;