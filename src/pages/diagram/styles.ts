import styled from "styled-components";

import Grid from "@mui/material/Grid";

import { ListProcesses } from "pages/diagram/dialogs/list-processes";

export const Wrapper = styled(Grid).attrs({
  container: true,
})`
  height: calc(100% - 64px);
  position: relative;
`;

export const ListProcessesDialog = styled(ListProcesses)``;
