import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";

import { TUser } from "models/user";
import { TWorkflow } from "models/workflow";

import { listDiagramByWorkflowId } from "services/resources/diagrams/list-by-workflow-id";
import { listWorkflowById } from "services/resources/workflows/list-by-id";

import { Button } from "shared/components/button";

import { RootState } from "store";

import * as S from "./styles";

type Props = {
  workflowId: string;
  onRefresh?: () => void;
  hideRefreshButton?: boolean;
  hideWatchButton?: boolean;
  hideHeader?: boolean;
};

export const Header: React.FC<Props> = ({
  workflowId,
  hideRefreshButton,
  hideWatchButton,
  onRefresh,
  hideHeader,
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

  if (!workflow || !diagram) {
    return null;
  }

  return (
    <S.Wrapper hideHeader={!!hideHeader}>
      {!hideHeader && (
        <S.SpacedRow>
          <S.Row gap={30}>
            <S.Column>
              <S.Title>{workflow?.name}</S.Title>
              <S.Subtitle>Version: {workflow?.version}</S.Subtitle>
            </S.Column>

            {workflow.isLatest && (
              <S.Tooltip title="Ultima versão">
                <PublishedWithChangesIcon color="secondary" />
              </S.Tooltip>
            )}

            {!workflow.isLatest && (
              <S.Tooltip title="Versão desatualizada">
                <SyncProblemIcon color="warning" />
              </S.Tooltip>
            )}

            {diagram?.name && <S.Title>Diagram: {diagram?.name}</S.Title>}

            {!diagram?.name && <S.Title>Diagram: diagrama não salvo</S.Title>}
          </S.Row>

          <S.Row gap={10}>
            {!hideRefreshButton && (
              <Button
                disableElevation
                title="Refresh"
                onClick={onRefresh}
                endIcon={<RefreshIcon />}
                size="small"
              />
            )}

            {!hideWatchButton && (
              <Button
                disableElevation
                title="Watch"
                size="small"
                endIcon={<VisibilityIcon />}
              />
            )}
          </S.Row>
        </S.SpacedRow>
      )}
    </S.Wrapper>
  );
};
