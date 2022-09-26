import styled from "styled-components";

import Grid from "@mui/material/Grid";

import { Confirmation } from "pages/diagram/dialogs/confirmation";
import { ListProcesses } from "pages/diagram/dialogs/list-processes";
import { ProcessInfo } from "pages/diagram/dialogs/process-info";
import { Properties } from "pages/diagram/dialogs/properties";

import { Header as BaseHeader } from "pages/diagram/components/header";
import { SaveDiagram } from "pages/diagram/dialogs/save-diagram";

export const Wrapper = styled(Grid).attrs({
  container: true,
})`
  height: calc(100% - 64px - 50px);
  position: relative;
`;

export const Header = styled(BaseHeader)``;

export const ListProcessesDialog = styled(ListProcesses)``;

export const SaveDiagramDialog = styled(SaveDiagram)``;

export const PropertiesDialog = styled(Properties)``;

export const ConfirmationDialog = styled(Confirmation)``;

export const ProcessInfoDialog = styled(ProcessInfo)``;
