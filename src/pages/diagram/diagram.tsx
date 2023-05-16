import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ListIcon from "@mui/icons-material/ListOutlined";
import ExtensionOutlined from "@mui/icons-material/ExtensionOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import InfoIcon from "@mui/icons-material/Info";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import _isEmpty from "lodash/isEmpty";

import { TProcess } from "models/process";
import { TUser } from "models/user";

import { getExecutionByProcessId } from "services/resources/processes/execution";
import { listDiagramByWorkflowId } from "services/resources/diagrams/list-by-workflow-id";

import { useDiagram } from "pages/diagram/hooks/useDiagram";
import { usePaint } from "pages/diagram/hooks/usePaint";

import { Fab } from "shared/components/fab";

import { IAction } from "shared/components/fab/types/IAction";

import { RootState } from "store";

import {
  refreshDiagram,
  setDeleteConfirmationDialog,
  setDeleteDialog,
  setProcessSelected,
  setSaveConfirmationDialog,
  setSaveDialog,
  setShowConfirmationDialog,
  setShowProcessInfoDialog,
  setShowPropertiesDialog,
} from "store/slices/diagram";

import {
  setShowDiagramInfoDialog,
  setDiagramSelected,
  setEditDialog,
} from "store/slices/dialog";

import { setHistory } from "store/slices/process-history";

import * as S from "./styles";
import { listByWorkflowId } from "services/resources/processes/list-by-process-id";

type Props = {};

export const DiagramRefactored: React.FC<Props> = () => {
  const { workflowId } = useParams();
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const diagramPageState = useSelector((state: RootState) => state.diagramPage);
  const dialogPageState = useSelector((state: RootState) => state.dialogPage);

  const diagram = useDiagram();
  const paint = usePaint();

  const [isOpen, setIsOpen] = useState(false);
  const [xml, setXml] = useState("");

  const isProcessFinished = getIsProcessFinished(
    diagramPageState.processSelected?.status ?? ""
  );

  function getIsProcessFinished(status: string) {
    const finishStatuses = ["finished", "expired", "error"];

    return finishStatuses.includes(status);
  }

  const getAllDiagrams = useCallback(async () => {
    const diagramsId = await listDiagramByWorkflowId(workflowId as string);
    dispatch(setDiagramSelected(diagramsId));

    dispatch(
      setShowDiagramInfoDialog({
        isVisible: true,
        data: diagramsId,
      })
    );
    dialogPageState?.diagramInfoDialog?.data(diagramsId);
    dispatch(setDiagramSelected(undefined));
  }, [workflowId, dispatch, dialogPageState?.diagramInfoDialog]);

  const actions = getActions();

  function getActions(): IAction[] {
    const arr = [
      {
        icon: <ListIcon />,
        tooltip: "Listar processos",
        onClick: () => setIsOpen(true),
      },
      {
        icon: <ExtensionOutlined />,
        tooltip: "Listar diagramas",
        onClick: async () => {
          getAllDiagrams();
        },
      },
      {
        icon: <SaveIcon />,
        tooltip: "Salvar Diagrama",
        onClick: async () => {
          if (!_isEmpty(dialogPageState.diagramSelected)) {
            dispatch(setSaveConfirmationDialog({ isVisible: true }));
          }
          if (_isEmpty(dialogPageState.diagramSelected)) {
            dispatch(setSaveDialog({ isVisible: true }));
          }
          const { xml } = await diagram.modeler.saveXML();
          setXml(xml);
        },
      },
      {
        icon: <FileDownloadIcon />,
        tooltip: "Download XML",
        onClick: () => diagram.downloadXML(diagram.modeler),
      },
      {
        icon: <CleaningServicesIcon />,
        tooltip: "Resetar cor",
        onClick: resetColor,
      },
      {
        icon: <DeleteIcon />,
        tooltip: "Excluir diagrama",
        onClick: () =>
          dispatch(setDeleteConfirmationDialog({ isVisible: true })),
      },
    ];

    if (!_isEmpty(diagramPageState.processSelected)) {
      arr.push({
        icon: <InfoIcon />,
        tooltip: "Informações do processo",
        onClick: () => dispatch(setShowProcessInfoDialog({ isVisible: true })),
      });
    }

    return arr;
  }

  function resetColor() {
    dispatch(setProcessSelected(undefined));
    const modeling = diagram.modeler.get("modeling");
    paint.elementsByDefault({
      modeling,
      elements: diagram.initialElements,
    });
  }

  async function onSelectItem(process: TProcess) {
    resetColor();
    dispatch(setProcessSelected(process));
  }

  async function onSelectDiagram(diagram: TUser) {
    resetColor();
    dispatch(setDiagramSelected(diagram));
    navigate(
      `/dashboard/workflows/${diagram.workflow_id}/diagram/${diagram.id}`
    );
  }

  async function onRefreshDiagram() {
    if (workflowId) {
      const response = await listByWorkflowId(workflowId);
      const selectedProcess = response.find(
        (process) => process.id === diagramPageState?.processSelected?.id
      );

      if (selectedProcess) {
        await onSelectItem(selectedProcess);
        dispatch(refreshDiagram());
      }
    }
  }

  useEffect(() => {
    if (!_isEmpty(workflowId || id)) {
      diagram.loadDiagram((workflowId || id) ?? "");
    }
  }, [diagram, workflowId, id]);

  useEffect(() => {
    const paintElementsByProcessId = async () => {
      if (!_isEmpty(diagramPageState.processSelected)) {
        const executionData = await getExecutionByProcessId(
          diagramPageState.processSelected?.id as string
        );

        const orderedStates = executionData.execution.slice().reverse();

        const modeling = diagram.modeler.get("modeling");
        const elementRegistry = diagram.modeler.get("elementRegistry");

        paint.elementsByDefault({
          modeling,
          elements: diagram.initialElements,
        });

        paint.elementsByStates({
          elements: elementRegistry.getAll(),
          modeling,
          states: orderedStates,
        });

        dispatch(setHistory(orderedStates));
      }
    };

    paintElementsByProcessId();
  }, [
    diagram.initialElements,
    diagram.modeler,
    diagramPageState.processSelected,
    paint,
    dispatch,
    diagramPageState.updatedAt,
  ]);

  return (
    <>
      <S.Wrapper ref={diagram.bpmn as any}>
        <S.Header
          hideHeader={_isEmpty(diagramPageState.processSelected)}
          hideRefreshButton={isProcessFinished}
          workflowId={workflowId as string}
          onRefresh={onRefreshDiagram}
        />

        <Fab actions={actions} />
      </S.Wrapper>

      <S.ListProcessesDialog
        workflowId={workflowId ?? ""}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelectItem={onSelectItem}
      />

      {dialogPageState.diagramInfoDialog.isVisible && (
        <S.ListDiagramsDialog
          isOpen={dialogPageState.diagramInfoDialog.isVisible}
          onClose={() =>
            dispatch(setShowDiagramInfoDialog({ isVisible: false }))
          }
          onSelectDiagram={onSelectDiagram}
        />
      )}

      {diagramPageState.saveDialog.isVisible && (
        <S.SaveDiagramDialog
          isOpen={diagramPageState.saveDialog.isVisible}
          onClose={() => dispatch(setSaveDialog({ isVisible: false }))}
          xml={xml}
        />
      )}

      {dialogPageState.editDialog.isVisible && (
        <S.EditDiagramDialog
          isOpen={dialogPageState.editDialog.isVisible}
          onClose={() => dispatch(setEditDialog({ isVisible: false }))}
          id={id as string}
        />
      )}

      {diagramPageState.saveConfirmationDialog.isVisible && (
        <S.DiagramConfirmationDialog
          isOpen={diagramPageState.saveConfirmationDialog.isVisible}
          onClose={() =>
            dispatch(setSaveConfirmationDialog({ isVisible: false }))
          }
        />
      )}

      {!_isEmpty(dialogPageState.diagramSelected) && (
        <S.DeleteDiagramDialog
          isOpen={diagramPageState.deleteDialog.isVisible}
          onClose={() => dispatch(setDeleteDialog({ isVisible: false }))}
          id={id as string}
        />
      )}

      <S.DeleteConfirmation
        isOpen={diagramPageState.deleteConfirmationDialog.isVisible}
        onClose={() =>
          dispatch(setDeleteConfirmationDialog({ isVisible: false }))
        }
      />

      {diagramPageState.propertiesDialog.isVisible && (
        <S.PropertiesDialog
          workflowId={workflowId ?? ""}
          isOpen={diagramPageState.propertiesDialog.isVisible}
          onClose={() =>
            dispatch(setShowPropertiesDialog({ isVisible: false }))
          }
        />
      )}

      {diagramPageState.confirmationDialog.isVisible && (
        <S.ConfirmationDialog
          isOpen={diagramPageState.confirmationDialog.isVisible}
          onClose={() =>
            dispatch(setShowConfirmationDialog({ isVisible: false }))
          }
        />
      )}

      {diagramPageState.processInfoDialog.isVisible && (
        <S.ProcessInfoDialog
          isOpen={diagramPageState.processInfoDialog.isVisible}
          process={diagramPageState.processSelected as TProcess}
          onClose={() =>
            dispatch(setShowProcessInfoDialog({ isVisible: false }))
          }
        />
      )}
    </>
  );
};
