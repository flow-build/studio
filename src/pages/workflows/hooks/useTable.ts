import { useMemo } from "react";
import {
  AddOutlined,
  ExtensionOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

import { useWorkflowPage } from "pages/workflows/hooks/useWorkflowPage";

import { TWorkflow } from "models/workflow";

import { getLongFormatByDate } from "shared/utils/date";
import { useDispatch } from "react-redux";
import { setProcessSelected } from "store/slices/diagram";

export function useTable(workflows: TWorkflow[]) {
  const dispatch = useDispatch();
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
        getLongFormatByDate(workflow.created_at),
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
            dispatch(setProcessSelected(undefined));
            workflowPage.navigateToDiagram(workflow.workflow_id);
          },
        },
      ];

      return { items, actions };
    });
  }, [dispatch, workflowPage, workflows]);

  return {
    rows,
    columnData,
  };
}
