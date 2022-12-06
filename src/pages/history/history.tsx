import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";
import _isNull from "lodash/isNull";

import { TState } from "models/state";

import { useTable } from "pages/history/hooks/useTable";

import { getHistoryByProcessId } from "services/resources/processes/history";

import { ContentHeader } from "shared/components/content-header";

import { RootState } from "store";

import * as S from "./styles";

export const History: React.FC<{}> = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [processId, setProcessId] = useState<string>();
  const comparePage = useSelector((store: RootState) => store.comparePage);

  const [history, setHistory] = useState<TState[] | null>(null);

  const table = useTable(history ?? []);

  const disable =
    _isEmpty(comparePage.oldJson) || _isEmpty(comparePage.newJson);
  const GO_BACK = -1;

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

  const buttonBack = {
    title: "Back",
    onClick: () => {
      navigate(GO_BACK);
    },
    variant: "outlined",
  };

  const buttonUpdate = {
    title: "Refresh",
    onClick: () => {
      request()
    },
  };

  const buttonNavigate = {
    title: "Navigate",
    disabled: disable,
    onClick: () => {
      navigate("/dashboard/compare-json");
    },
  };


  return (
    <S.Wrapper>
      <S.HeaderContainer>
        <ContentHeader
          title="History"
          subtitle={`Process id: ${processId}`}
          hasInput={false}
          hasBackButton={false}
          buttons={[buttonBack, buttonUpdate, buttonNavigate]}
          showToggle={false}
        />
      </S.HeaderContainer>

      <S.TableContainer>
        <S.Table columnData={table.columnData} rows={table.rows} isCollapse />
      </S.TableContainer>
    </S.Wrapper>
  );
};
