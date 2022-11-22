import styled from "styled-components";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

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

export const ResendCodeButton = styled(Button).attrs({
    variant: "contained",
    fullWidth: true,
})`
  height: 3.5rem;
  `;

export const SubmitContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 5px;
  
    margin: 40px 0 20px;
  `;