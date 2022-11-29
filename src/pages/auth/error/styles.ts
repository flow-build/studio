import styled from "styled-components";

import Box from "@mui/material/Box";
import DialogContentText from "@mui/material/DialogContentText";
import Grid from "@mui/material/Grid";

import { Button } from "shared/components/button";

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

export const MessageContainer = styled(Box).attrs({
    sx: { width: 320 },
})``;

export const DivMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    margin: 20px 0 20px;
`;

export const Text = styled(DialogContentText)``;

export const ForgotPasswordButton = styled(Button).attrs({
    type: "button",
    variant: "contained",
    title: "Forgot your password?",
    fullWidth: true,
})`
    height: 3.5rem;
`;

export const SignInButton = styled(Button).attrs({
    title: "Sign in",
    variant: "text",
})``;