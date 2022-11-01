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

  export const SubmitButton = styled(Button).attrs({
    type: "submit",
    variant: "contained",
    fullWidth: true,
  })`
    height: 3.5rem;
  `;