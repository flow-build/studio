import styled from "styled-components";

import { Button as BaseButton } from "shared/components/button";

import { Form as BaseForm } from "pages/settings/components/form";

import { DashboardForm as FormDashboard } from "./components/dashboard-form";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export const Wrapper = styled(Box).attrs({
  sx: {
    height: 1000,
    marginTop: -4,
    paddingLeft: 2,
    paddingTop: 2,
  },
})`
  height: calc(100% - 64px);
  background: ${({ theme }) => theme.palette.background.default};
`;

export const Title = styled(Typography).attrs({
  variant: "h3",
})`
  margin: 2rem 1rem;
`;

export const Form = styled(BaseForm)``;

export const DashboardForm = styled(FormDashboard)``;

export const Button = styled(BaseButton)`
  width: 6rem;
  height: 3.5rem;
`;
