import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ListIcon from "@mui/icons-material/ListOutlined";
import ExtensionOutlined from "@mui/icons-material/ExtensionOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import InfoIcon from "@mui/icons-material/Info";
import SaveIcon from "@mui/icons-material/Save";

import _isEmpty from "lodash/isEmpty";

import { TProcess } from "models/process";

import { useDiagram } from "pages/diagram/hooks/useDiagram";
import { usePaint } from "pages/diagram/hooks/usePaint";

import { getHistoryByProcessId } from "services/resources/processes/history";

import { Fab } from "shared/components/fab";

import { RootState } from "store";

import { IAction } from "shared/components/fab/types/IAction";
import { useDispatch, useSelector } from "react-redux";
import {
  setProcessSelected,
  setShowConfirmationDialog,
  setShowProcessInfoDialog,
  setShowPropertiesDialog,
} from "store/slices/diagram";

import {
  setShowDiagramInfoDialog,
  setDiagramSelected,
} from "store/slices/dialog";

import { setHistory } from "store/slices/process-history";

import * as S from "./styles";
import { TUser } from "models/user";
import { TWorkflow } from "models/workflow";
import { listWorkflows } from "services/resources/workflows/list";
import { listByWorkflowId } from "services/resources/diagrams/list-by-workflow-id";


type Props = {};

export const DiagramRefactored: React.FC<Props> = () => {
  const { workflowId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const diagramPageState = useSelector((state: RootState) => state.diagramPage);
  const dialogPageState = useSelector((state: RootState) => state.dialogPage);
  const workflowPageState = useSelector(
    (state: RootState) => state.workflowPage
  );

  const diagram = useDiagram();
  const paint = usePaint();

  const [isOpen, setIsOpen] = useState(false);
  const [isSaveDialogOpen, setSaveDialogOpen] = useState(false);
  const [xml, setXml] = useState("");
  const [workflow, setWorkflow] = useState<TWorkflow[]>();

  const getAllDiagrams = useCallback(async () => {
    const response = await listWorkflows({ search: workflowPageState.filter });

    const diagramsId = await listByWorkflowId(workflowId as string);
    dispatch(setDiagramSelected(diagramsId));

    const workflowsWithDiagrams = response.map((workflow) => {
      if (
        diagramsId.includes(workflow.workflow_id) &&
        diagramsId.length > 0
      ) {
        return { ...workflow, totalDiagrams: diagramsId.length };
      }
      return { ...workflow, totalDiagrams: undefined };
    });

    dispatch(
      setShowDiagramInfoDialog({
        isVisible: true,
        data: diagramsId,
      })
    );
    dialogPageState?.confirmationDialog?.data(diagramsId);
    dispatch(setDiagramSelected(undefined));

    setWorkflow(workflowsWithDiagrams.reverse());
  }, [workflowPageState.filter, workflowId, dispatch, dialogPageState?.confirmationDialog]);


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
          setSaveDialogOpen(true);
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
    navigate(`/dashboard/workflows/${diagram.workflow_id}/diagram`);
  }

  useEffect(() => {
    if (!_isEmpty(workflowId)) {
      diagram.loadDiagram(workflowId ?? "");
    }
  }, [diagram, workflowId]);

  useEffect(() => {
    const paintElementsByProcessId = async () => {
      if (!_isEmpty(diagramPageState.processSelected)) {
        const history = await getHistoryByProcessId(
          diagramPageState.processSelected?.id as string
        );

        const orderedStates = history.slice().reverse();

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
  ]);

  return (
    <>
      <S.Wrapper ref={diagram.bpmn as any}>
        {!_isEmpty(diagramPageState.processSelected) && (
          <S.Header workflowId={workflowId as string} />
        )}

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

      <S.SaveDiagramDialog
        isOpen={isSaveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        xml={xml}
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

