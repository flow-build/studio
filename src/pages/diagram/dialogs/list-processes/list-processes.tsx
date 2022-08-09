import React, { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";

import _isNull from "lodash/isNull";
import _isEmpty from "lodash/isEmpty";

import { TProcess } from "models/process";

import { Form } from "pages/diagram/dialogs/list-processes/components/form/form";

import { listByWorkflowId } from "services/resources/processes/list-by-process-id";

import { getLongFormatByDate } from "shared/utils/date";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  workflowId: string;
  onSelectItem?: (process: TProcess) => void;
};

export const ListProcesses: React.FC<Props> = ({
  isOpen,
  onClose,
  workflowId,
  onSelectItem,
  process,
}) => {
  const [processes, setProcesses] = useState<TProcess[]>([]);
  const [filtered, setFiltered] = useState<TProcess[]>([]);

  function onClickListItemButton(process: TProcess) {
    if (onClose) {
      onClose();
    }
    if (onSelectItem) {
      onSelectItem(process);
    }
  }

  function getSubtitle(process: TProcess) {
    const createdAt = getLongFormatByDate(process.created_at);
    const { state, status } = process;
    return `${state.node_id} - ${status} - ${createdAt}`;
  }

  useEffect(() => {
    const request = async () => {
      const response = await listByWorkflowId(workflowId);
      setProcesses(response);
      setFiltered(response);
    };
    if (isOpen) {
      request();
    }
  }, [isOpen, workflowId]);

  function onFilter(payload: any) {
    const filter = processes.filter((process) => {
      const nodeId =
        _isEmpty(payload.nodeId) ||
        process.state.node_id.includes(payload.nodeId);

      const status =
        _isEmpty(payload.status) || process.status.includes(payload.status);

      const before =
        _isNull(payload.finalDate) ||
        isBefore(new Date(process.created_at), payload.finalDate);

      const after =
        _isNull(payload.initialDate) ||
        isAfter(new Date(process.created_at), payload.initialDate);

      if (nodeId && status && before && after) {
        return true;
      }

      return false;
    });

    setFiltered(filter);
  }

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>
        Lista de processos
        <S.CloseButton onClick={onClose} />
      </S.Title>

      <Form onClick={onFilter} />

      <S.Content dividers>
        <List>
          {filtered.map((process) => (
            <ListItem disablePadding>
              <ListItemButton onClick={() => onClickListItemButton(process)}>
                <ListItemText
                  primary={process.id}
                  secondary={getSubtitle(process)}
                />
                <S.RightArrow />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </S.Content>
    </S.Wrapper>
  );
};
