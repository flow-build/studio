import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ListIcon from "@mui/icons-material/ListOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

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
  setShowConfirmationDialog,
  setShowPropertiesDialog,
} from "store/slices/diagram";

type Props = {};

export const DiagramRefactored: React.FC<Props> = () => {
  const { workflowId } = useParams();
  const [processSelected, setProcessSelected] = useState<TProcess>();
  const diagram = useDiagram(processSelected);
  const paint = usePaint();

  const dispatch = useDispatch();

  const diagramPageState = useSelector((state: RootState) => state.diagramPage);

  const [isOpen, setIsOpen] = useState(false);

  const actions: IAction[] = [
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

  function resetColor() {
    setProcessSelected(undefined);
    const modeling = diagram.modeler.get("modeling");
    paint.elementsByDefault({
      modeling,
      elements: diagram.initialElements,
    });
  }

  async function onSelectItem(process: TProcess) {
    resetColor();
    setProcessSelected(process);

    const history = await getHistoryByProcessId(process.id);
    const orderedStates = history.reverse();

    const modeling = diagram.modeler.get("modeling");
    const elementRegistry = diagram.modeler.get("elementRegistry");

    paint.elementsByStates({
      elements: elementRegistry.getAll(),
      modeling,
      states: orderedStates,
    });
  }

  useEffect(() => {
    if (!_isEmpty(workflowId)) {
      diagram.loadDiagram(workflowId ?? "");
    }
  }, [diagram, workflowId]);

  return (
    <>
      <S.Wrapper ref={diagram.bpmn as any}>
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
    </>
  );
};
