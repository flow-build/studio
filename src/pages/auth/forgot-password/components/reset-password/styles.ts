import styled from "styled-components";

import Box from "@mui/material/Box";

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

  export const SubmitContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 5px;

  margin: 20px 0 20px;
`;

export const SubmitButton = styled(Button).attrs({
  fullWidth: true,
  type: "submit",
  variant: "contained",
})`
  height: 3.5rem;
`;

export const ResendCodeButton = styled(Button).attrs({
  title: "Resend code",
    fullWidth: true,
    variant: "outlined",
  })`
    height: 3.5rem;
  `;
