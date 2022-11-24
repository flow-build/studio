import styled from "styled-components";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Logo } from "pages/auth/components/logo";
import { Version } from "pages/auth/components/version";

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

export const FlowbuildLogo = styled(Logo)``;

export const ProjectVersion = styled(Version)``;
