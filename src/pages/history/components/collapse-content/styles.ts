import styled from "styled-components";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const BoxTable = styled(Box).attrs({
  margin: 1,
  mr: 6,
  mb: 6,
  display: "inline-block",
  justifyContent: "space-between",
  width: 400,
  height: 400,
})``;

export const TitleTable = styled(Typography).attrs({
  variant: "h6",
  component: "p",
  gutterBottom: true,
  display: "inline-block",
})``;

export const TextTable = styled(Typography).attrs({
  variant: "caption",
  component: "p",
})``;



