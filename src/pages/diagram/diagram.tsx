import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ListIcon from "@mui/icons-material/ListOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import InfoIcon from "@mui/icons-material/Info";

import _isEmpty from "lodash/isEmpty";

import { TProcess } from "models/process";

import { useDiagram } from "pages/diagram/hooks/useDiagram";
import { usePaint } from "pages/diagram/hooks/usePaint";

import { getHistoryByProcessId } from "services/resources/processes/history";

import { Fab } from "shared/components/fab";

import { RootState } from "store";

import * as S from "./styles";
import { IAction } from "shared/components/fab/types/IAction";
import { useDispatch, useSelector } from "react-redux";
import {
  setProcessSelected,
  setShowConfirmationDialog,
  setShowProcessInfoDialog,
  setShowPropertiesDialog,
} from "store/slices/diagram";

type Props = {};

export const DiagramRefactored: React.FC<Props> = () => {
  const { workflowId } = useParams();
  const diagramPageState = useSelector((state: RootState) => state.diagramPage);
  const diagram = useDiagram();
  const paint = usePaint();

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const actions = getActions();

  function getActions(): IAction[] {
    const arr = [
      {
        icon: <ListIcon />,
        tooltip: "Listar processos",
        onClick: () => setIsOpen(true),
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
        const orderedStates = history.reverse();

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
      }
    };

    paintElementsByProcessId();
  }, [
    diagram.initialElements,
    diagram.modeler,
    diagramPageState.processSelected,
    paint,
  ]);

  return (
    <>
      <S.Wrapper ref={diagram.bpmn as any}>
        {!_isEmpty(diagramPageState.processSelected) && (
          <S.Header
            workflowId={diagramPageState.processSelected?.workflow_id as string}
          />
        )}

        <Fab actions={actions} />
      </S.Wrapper>

      <S.ListProcessesDialog
        workflowId={workflowId ?? ""}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelectItem={onSelectItem}
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
