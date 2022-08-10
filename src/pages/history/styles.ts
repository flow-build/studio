import styled from "styled-components";

import Grid from "@mui/material/Grid";

import { IconButton } from "shared/components/icon-button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { Table as SharedTable } from "shared/components/table";

export const Wrapper = styled(Grid).attrs({
  container: true,
  spacing: 2,
  sx: { marginTop: 0 },
})`
  height: calc(100% - 64px);
`;

export const HeaderContainer = styled.div`
  width: 100vw;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled(IconButton).attrs({
  icon: KeyboardBackspaceIcon,
  ariaLabel: "close",
  tooltip: "voltar",
  title: "Voltar",
})``;

export const TableContainer = styled(Grid).attrs({
  item: true,
  xs: 12,
})`
  height: calc(100% - 145px);
  overflow-y: auto;
`;

export const Table = styled(SharedTable)``;
