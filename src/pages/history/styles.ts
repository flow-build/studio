import styled from "styled-components";

import Grid from "@mui/material/Grid";

import { Table as SharedTable } from "shared/components/table";
import { Button as SharedButton } from "shared/components/button";

export const Wrapper = styled(Grid).attrs({
  container: true,
  spacing: 2,
  sx: { marginTop: 0 },
})`
  height: calc(100% - 64px - 30px);
`;

export const HeaderContainer = styled.div`
  width: 100vw;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Button = styled(SharedButton)``;

export const TableContainer = styled(Grid).attrs({
  item: true,
  xs: 12,
})`
  height: calc(100% - 145px - 30px);
  overflow-y: auto;
`;

export const Table = styled(SharedTable)``;
