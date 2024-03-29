import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _debounce from "lodash/debounce";

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

import { useSnackbar } from "notistack";

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
  setFormDialog,
} from "store/slices/dialog";

import { setHistory } from "store/slices/process-history";
import { listByWorkflowId } from "services/resources/processes/list-by-process-id";
import { LocalStorage } from "shared/utils/base-storage/local-storage";
import { usePahoMqtt } from "shared/hooks/paho-mqtt/usePahoMqtt";

import * as S from "./styles";

type Props = {};

export const DiagramRefactored: React.FC<Props> = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { connect } = usePahoMqtt();
  const [isWatching, setIsWatching] = useState(false);

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

    if (!diagramsId) {
      return enqueueSnackbar("Erro ao retornar diagrama", {
        autoHideDuration: 2000,
        variant: "error",
      });
    }

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

  function onWatchClick() {
    const envHost = process.env.REACT_APP_MQTT_HOST ?? "";
    const envPort = process.env.REACT_APP_MQTT_PORT ?? "";

    const localStorageInstance = LocalStorage.getInstance();
    const localHost = localStorageInstance.getValueByKey<string>("MQTT_URL");
    const localPort = localStorageInstance.getValueByKey<string>("MQTT_PORT");

    const hostMqtt = localHost ?? envHost;
    const portMqtt = localPort ?? envPort;

    const namespace =
      localStorageInstance.getValueByKey<string>("MQTT_NAMESPACE") ?? "";

    const topic = `${namespace}/process/${diagramPageState.processSelected?.id}/state`;

    connect(hostMqtt, Number(portMqtt), {
      topics: [topic],
      onSuccess: () => {
        setIsWatching(true);
      },
      onMessageArrived: _debounce(async (payload: string) => {
        await onRefreshDiagram();
      }, 1000),
    });
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
          hideWatchButton={isProcessFinished}
          workflowId={workflowId as string}
          onRefresh={onRefreshDiagram}
          isWatching={isWatching}
          onWatchClick={onWatchClick}
        />

        <Fab top={18} actions={actions} />
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

      {dialogPageState.editDialog.isVisible && (
        <S.FormDiagramDialog
          isOpen={dialogPageState.editDialog.isVisible}
          onClose={() => dispatch(setFormDialog({ isVisible: false }))}
          id={id as string}
          xml={xml}
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
