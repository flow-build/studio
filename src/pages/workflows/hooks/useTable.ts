import { useMemo } from "react";
import { useDispatch } from "react-redux";

import { listDiagramByWorkflowId } from "services/resources/diagrams/list-by-workflow-id";

import { useWorkflowPage } from "pages/workflows/hooks/useWorkflowPage";

import { TWorkflow } from "models/workflow";

import { getDateTimeFormatByDate } from "shared/utils/date";
import { setProcessSelected } from "store/slices/diagram";
import { setDiagramSelected } from "store/slices/dialog";

import {
  AddOutlined,
  ExtensionOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

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
          badge: workflow.totalDiagrams,
          onClick: async () => {
            const response = await listDiagramByWorkflowId(
              workflow.workflow_id
            );
            dispatch(setDiagramSelected(response));

            /* if (!_isEmpty(response)) {
              dispatch(
                setShowDiagramInfoDialog({
                  isVisible: true,
                  data: response,
                })
              );
              dialogPageState?.confirmationDialog?.data(response);
              dispatch(setDiagramSelected(undefined));
              return;
            } */

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
