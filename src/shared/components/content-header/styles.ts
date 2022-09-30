import styled from "styled-components";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { Button as SharedButton } from "shared/components/button";
import { IconButton } from "shared/components/icon-button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { RightArrow } from "pages/diagram/dialogs/list-processes/styles";

export const Wrapper = styled(Grid).attrs({
  item: true,
  xs: 12,
})``;

export const Row = styled(Grid).attrs({
  item: true,
  xs: 12,
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RowButtons = styled(Grid).attrs({
  item: true,
  xs: 12,
})`
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 5px;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled(Typography).attrs({
  variant: "h4",
  component: "h4",
  gutterBottom: true,
})``;

export const Subtitle = styled(Typography).attrs({
  variant: "caption",
  component: "h5",
  gutterBottom: true,
})``;

export const Button = styled(SharedButton)``;

export const BackButton = styled(IconButton).attrs({
  icon: KeyboardBackspaceIcon,
  ariaLabel: "close",
  tooltip: "voltar",
  title: "Voltar",
})`
  display: flex;
  align-items: center;
  justify-content: right;
`;

export const Input = styled(TextField).attrs({
  size: "small",
})``;