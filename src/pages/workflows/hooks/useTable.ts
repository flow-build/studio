import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  AddOutlined,
  ExtensionOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

import { useWorkflowPage } from "pages/workflows/hooks/useWorkflowPage";

import { TWorkflow } from "models/workflow";

import { getDateTimeFormatByDate } from "shared/utils/date";
import { setProcessSelected } from "store/slices/diagram";
import {
  setDiagramSelected,
  setShowDiagramInfoDialog,
} from "store/slices/dialog";
import _isEmpty from "lodash/isEmpty";
import { RootState } from "store";
import { listById } from "services/resources/diagrams/list-by-id";
import { TUser } from "models/user";
import { listByWorkflow } from "services/resources/diagrams/list-by-workflow";

export function useTable(workflows: TWorkflow[]) {
  const dispatch = useDispatch();
  const workflowPage = useWorkflowPage();

  const dialogPageState = useSelector((state: RootState) => state.dialogPage);
  

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
          onClick: async () => {
            const response = await listByWorkflow(workflow.workflow_id);
            console.log(response, "response");
            dispatch(setDiagramSelected((response)));

            if (!_isEmpty(response)) {
              dispatch(
                setShowDiagramInfoDialog({
                  isVisible: true,
                  data: response,
                })
              );
              dialogPageState.confirmationDialog.data(response);
              dispatch(setDiagramSelected(undefined));
              return;
            }

            dispatch(setProcessSelected(undefined));
            workflowPage.navigateToDiagram(workflow.workflow_id);

            //pegar os dados
            //verificar se tem o dado ou não
            //se tiver o dado dar o dispatch
            //se não tiver fazer o navigate
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
