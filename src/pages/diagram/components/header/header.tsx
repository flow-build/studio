import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RefreshIcon from "@mui/icons-material/Refresh";

import statusOk from "assets/images/latest-version-button/status-ok.svg";
import statusWarning from "assets/images/latest-version-button/status-warning.svg";

import { TUser } from "models/user";
import { TWorkflow } from "models/workflow";

import { listDiagramByWorkflowId } from "services/resources/diagrams/list-by-workflow-id";
import { listWorkflowById } from "services/resources/workflows/list-by-id";

import { RootState } from "store";

import { IconButton } from "shared/components/icon-button";

import * as S from "./styles";

type Props = {
  workflowId: string;
  onRefresh?: () => void;
  hideRefreshButton?: boolean;
};

export const Header: React.FC<Props> = ({
  workflowId,
  hideRefreshButton,
  onRefresh,
}) => {
  const [workflow, setWorkflow] = useState<TWorkflow>();

  const [diagram, setDiagram] = useState<TUser | undefined>();

  const dialogPageState = useSelector((state: RootState) => state.dialogPage);

  useEffect(() => {
    const request = async () => {
      const response = await listWorkflowById(workflowId);
      setWorkflow(response);
    };

    request();

    const requestDiagram = async () => {
      await listDiagramByWorkflowId(workflowId);
      setDiagram(dialogPageState.diagramSelected);
    };

    requestDiagram();
  }, [workflowId, dialogPageState.diagramSelected]);

  if (!workflow) {
    return null;
  }

  if (!diagram) {
    return null;
  }

  return (
    <S.Wrapper>
      <S.TitleContent>
        <S.Title>Workflow: {workflow?.name}</S.Title>
        <S.Title>-</S.Title>
        <S.Title>Version: {workflow?.version}</S.Title>
      </S.TitleContent>

      {workflow.isLatest && (
        <S.Tooltip title="Ultima versão">
          <S.Status>
            <img src={statusOk} alt="StatusOk" />
          </S.Status>
        </S.Tooltip>
      )}

      {!workflow.isLatest && (
        <S.Tooltip title="Versão desatualizada">
          <S.Status>
            <img src={statusWarning} alt="StatusWarning" />
          </S.Status>
        </S.Tooltip>
      )}

      {diagram?.name && (
        <S.TitleContent>
          <S.Title>Diagram: {diagram?.name}</S.Title>
        </S.TitleContent>
      )}

      {!diagram?.name && (
        <S.TitleContent>
          <S.Title>Diagram: diagrama não salvo</S.Title>
        </S.TitleContent>
      )}

      {!hideRefreshButton && (
        <IconButton onClick={onRefresh} icon={RefreshIcon} tooltip="Refresh" />
      )}
    </S.Wrapper>
  );
};
