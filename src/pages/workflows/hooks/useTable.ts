import { useMemo } from "react";
import {
  AddOutlined,
  ExtensionOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

import { useWorkflowPage } from "pages/workflows/hooks/useWorkflowPage";

import { TWorkflow } from "models/workflow";

import { getDateTimeFormatByDate } from "shared/utils/date";
import { useDispatch, useSelector } from "react-redux";
import { setProcessSelected } from "store/slices/diagram";
import {
  setDiagramSelected,
  setShowDiagramInfoDialog,
} from "store/slices/dialog";
import { RootState } from "store";

export function useTable(workflows: TWorkflow[]) {
  const dispatch = useDispatch();
  const dialogPageState = useSelector((state: RootState) => state.dialogPage);
  const workflowPage = useWorkflowPage();

  const columnData = useMemo(() => {
    return [
      { id: "name", name: "Name" },
      { id: "id", name: "ID" },
      { id: "description", name: "Description" },
      { id: "version", name: "Version" },
      { id: "createdAt", name: "Created at" },
      { id: "actions", name: "Actions" },
    ];
  }, []);

  const rows = useMemo(() => {
    return workflows.map((workflow) => {
      const items = [
        workflow.name,
        workflow.workflow_id,
        workflow.description,
        workflow.version,
        getDateTimeFormatByDate(workflow.created_at),
      ];

      const actions = [
        {
          icon: VisibilityOutlined,
          tooltip: "Ver processos",
          onClick: () => workflowPage.navigateToProcess(workflow.workflow_id),
        },
        {
          icon: AddOutlined,
          tooltip: "Novo processo",
          onClick: () =>
            workflowPage.createProcess(workflow.name, workflow.workflow_id),
        },
        {
          icon: ExtensionOutlined,
          tooltip: "Ver diagrama",
          onClick: () => {
            dispatch(setShowDiagramInfoDialog({ isVisible: true }));
            dispatch(setDiagramSelected(undefined));
            dialogPageState.diagramInfoDialog.data({ workflow });
            
            dispatch(setProcessSelected(undefined));
            workflowPage.navigateToDiagram(workflow.workflow_id);
          },
        },
      ];

      return { items, actions };
    });
  }, [dispatch, workflowPage, workflows, dialogPageState]);

  return {
    rows,
    columnData,
  };
}
