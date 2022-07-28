import styled from "styled-components";

import Grid from "@mui/material/Grid";

import { ListProcesses } from "pages/diagram/dialogs/list-processes";
import { Properties } from "pages/diagram/dialogs/properties";
import { Confirmation } from "pages/diagram/dialogs/confirmation";

export const Wrapper = styled(Grid).attrs({
  container: true,
})`
  height: calc(100% - 64px);
  position: relative;
`;

export const ListProcessesDialog = styled(ListProcesses)``;

export const PropertiesDialog = styled(Properties)``;

export const ConfirmationDialog = styled(Confirmation)``;
