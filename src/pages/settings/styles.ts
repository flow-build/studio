import styled from "styled-components";

import { Button as BaseButton } from "shared/components/button";

import { Form as BaseForm } from "pages/settings/components/form";

import { DashboardForm as FormDashboard } from "./components/dashboard-form";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export const Wrapper = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: ${({ theme }) => theme.palette.background.default};
`;

export const Title = styled(Typography).attrs({
  variant: "h5",
})`
  margin: 2rem 1rem;
`;

export const Form = styled(BaseForm)``;

export const DashboardForm = styled(FormDashboard)``;

export const Button = styled(BaseButton)`
  width: 6rem;
  height: 3.5rem;
`;
