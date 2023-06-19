import styled from "styled-components";

import Grid from "@mui/material/Grid";

import { Header as BaseHeader } from "pages/diagram/components/header";
import { Confirmation } from "pages/diagram/dialogs/confirmation";
import { ListProcesses } from "pages/diagram/dialogs/list-processes";
import { ListDiagrams } from "../../dialogs/list-diagrams/list-diagrams";
import { ProcessInfo } from "pages/diagram/dialogs/process-info";
import { Properties } from "pages/diagram/dialogs/properties";

import { DeleteDiagram } from "./dialogs/delete-diagram";
import { ConfirmationDelete } from "./dialogs/confirmation-delete";
import { FormDiagram } from "./dialogs/form-diagram";
import { DiagramConfirmation } from "./dialogs/diagram-confirmation";

export const Wrapper = styled(Grid).attrs({
  container: true,
})`
  height: calc(100% - 64px - 50px);
  position: relative;
`;

export const Header = styled(BaseHeader)``;

export const ListProcessesDialog = styled(ListProcesses)``;

export const ListDiagramsDialog = styled(ListDiagrams)``;

export const DeleteDiagramDialog = styled(DeleteDiagram)``;

export const DeleteConfirmation = styled(ConfirmationDelete)``;
export const FormDiagramDialog = styled(FormDiagram)``;

export const DiagramConfirmationDialog = styled(DiagramConfirmation)``;

export const PropertiesDialog = styled(Properties)``;

export const ConfirmationDialog = styled(Confirmation)``;

export const ProcessInfoDialog = styled(ProcessInfo)``;

