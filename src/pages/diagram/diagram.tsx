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

import * as S from "./styles";
import { IAction } from "shared/components/fab/types/IAction";

type Props = {};

export const DiagramRefactored: React.FC<Props> = () => {
  const { workflowId } = useParams();
  const diagram = useDiagram();
  const paint = usePaint();

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
      onClick: () => {
        const modeling = diagram.modeler.get("modeling");
        paint.elementsByDefault({
          modeling,
          elements: diagram.initialElements,
        });
      },
    },
  ];

  async function onSelectItem(process: TProcess) {
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
    </>
  );
};
