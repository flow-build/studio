import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import _isEqual from "lodash/isEqual";

import { ModeView } from "constants/mode-view";

import { TWorkflow } from "models/workflow";
import { TUser } from "models/user";

import { CardsView } from "pages/workflows/components/cards-view";
import { useTable } from "pages/workflows/hooks/useTable";

import { listWorkflows } from "services/resources/workflows/list";

import { ContentHeader } from "shared/components/content-header";

import { RootState } from "store";
import {
  resetFilter,
  setStartProcessDialog,
  updateFilter,
} from "store/slices/workflow-page";
import {
  setShowDiagramInfoDialog,
  setDiagramSelected,
} from "store/slices/dialog";

import * as S from "./styles";
import { list } from "services/resources/diagrams/list";

export const Workflows: React.FC = () => {
  const dispatch = useDispatch();

  const workflowPageState = useSelector(
    (state: RootState) => state.workflowPage
  );
  const dialogPageState = useSelector((state: RootState) => state.dialogPage);

  const [workflows, setWorkflows] = useState<TWorkflow[]>([]);
  const [modeView, setModeView] = useState(ModeView.LIST);

  const table = useTable(workflows);

  const onChangeModeView = useCallback((newModeView: ModeView) => {
    setModeView(newModeView);
  }, []);

  const onFilter = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      dispatch(updateFilter(event.target.value));
    },
    [dispatch]
  );

  const getAllWorkflows = useCallback(async () => {
    const response = await listWorkflows({ search: workflowPageState.filter });

    const diagrams = await list();

    const diagramWorkflowId = diagrams.map((diagram: any) => diagram.workflow_id);

    const workflowsWithDiagrams = response.map((workflow) => {
      const filtered = diagramWorkflowId.filter((diagramList: string) => diagramList === workflow.workflow_id)

      if (diagramWorkflowId.includes(workflow.workflow_id) && diagrams.length > 0) {
        return { ...workflow, totalDiagrams: filtered.length };
      }
      return { ...workflow, totalDiagrams: undefined };
    });

    setWorkflows(workflowsWithDiagrams.reverse());
  }, [workflowPageState.filter]);

  useEffect(() => {
    getAllWorkflows();
  }, [getAllWorkflows]);

  useEffect(() => {
    return () => {
      dispatch(resetFilter());
    };
  }, [dispatch]);

  async function onSelectDiagram(diagram: TUser) {
    dispatch(setDiagramSelected(diagram));
  }

  return (
    <>
      <S.Wrapper>
        <ContentHeader
          title="Workflows"
          inputLabel="Nome / ID"
          onChangeModeView={onChangeModeView}
          onChangeInput={onFilter}
        />

        {_isEqual(modeView, ModeView.CARDS) && (
          <CardsView workflows={workflows} />
        )}

        {_isEqual(modeView, ModeView.LIST) && (
          <S.TableContainer>
            <S.Table columnData={table.columnData} rows={table.rows} />
          </S.TableContainer>
        )}
      </S.Wrapper>

      {workflowPageState.startProcessDialog.isVisible && (
        <S.StartProcessDialog
          isOpen={workflowPageState.startProcessDialog.isVisible}
          onClose={() => dispatch(setStartProcessDialog({ isVisible: false }))}
        />
      )}

      <S.ListDiagramsDialog
        isOpen={dialogPageState.diagramInfoDialog.isVisible}
        onClose={() => dispatch(setShowDiagramInfoDialog({ isVisible: false }))}
        onSelectDiagram={onSelectDiagram}
      />
    </>
  );
};

