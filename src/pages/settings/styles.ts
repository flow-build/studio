import styled from "styled-components";

import { Button as BaseButton } from "shared/components/button";

import { Form as BaseForm } from "pages/settings/components/form";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export const Wrapper = styled(Box).attrs({
  sx: {
    height: 1000,
    marginTop: -4,
    paddingLeft: 2,
    paddingTop: 2,
    background: (theme) => theme.palette.background.default,
  },
})`
height: calc(100% - 64px);
`;

export const Title = styled(Typography).attrs({
  variant: "h3",
})`
  margin: 2rem 1rem;
`;

export const Form = styled(BaseForm)``;

export const Button = styled(BaseButton)`
  width: 6rem;
  height: 3.5rem;
`;
