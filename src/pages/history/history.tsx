import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import _isEqual from "lodash/isEqual";
import _isNull from "lodash/isNull";

import { TState } from "models/state";

import { useTable } from "pages/history/hooks/useTable";

import { getHistoryByProcessId } from "services/resources/processes/history";

import { ContentHeader } from "shared/components/content-header";

import { useDispatch } from "react-redux";

import * as S from "./styles";

export const History: React.FC<{}> = () => {
  const params = useParams();
  const [processId, setProcessId] = useState<string>();
  const navigate = useNavigate();
  const GO_BACK = -1;

  const dispatch = useDispatch();

  const [history, setHistory] = useState<TState[] | null>(null);

  const table = useTable(history ?? []);

  const request = useCallback(async () => {
    const response = await getHistoryByProcessId(processId ?? "");
    setHistory(response.reverse());
  }, [processId]);

  useEffect(() => {
    if (processId) {
      request();
    }
  }, [processId, request]);

  useEffect(() => {
    if (!_isEqual(processId, params.process_id)) {
      setProcessId(params.process_id);
    }
  }, [params.process_id, processId]);

  if (_isNull(history)) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <S.Wrapper>
      <S.HeaderContainer>
        <ContentHeader
          title="History"
          subtitle={`Process id: ${processId}`}
          hasInput={false}
          buttonTitle="Atualizar"
          onButtonClick={request}
          showToggle={false}
        />
        <S.BackButton onClick={() => navigate(GO_BACK)} />
      </S.HeaderContainer>

      <S.TableContainer>
        <S.Table columnData={table.columnData} rows={table.rows} isCollapse />
      </S.TableContainer>

    </S.Wrapper>
  );
};
