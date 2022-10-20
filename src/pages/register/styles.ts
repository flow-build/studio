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

export const LoginContainer = styled(Box).attrs({
  sx: { width: 320 },
})``;

export const LogoContainer = styled(Box).attrs({
  sx: {
    display: "flex",
    justifyContent: "center",
    mb: 4,
  },
})``;

export const Text = styled(DialogContentText)``;

export const VersionContainer = styled(Box).attrs({
  sx: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: "10px",
    mb: 4,
  },
})``;

export const RegisterButton = styled(Button).attrs({
  variant: "text",
})``;

export const RegisterButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
