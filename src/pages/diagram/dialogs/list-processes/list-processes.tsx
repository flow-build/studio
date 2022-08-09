import React, { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { TProcess } from "models/process";
import { listByWorkflowId } from "services/resources/processes/list-by-process-id";
import { getLongFormatByDate } from "shared/utils/date";
import { Form } from "pages/diagram/dialogs/list-processes/components/form/form";
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
}) => {
  const [processes, setProcesses] = useState<TProcess[]>([]);

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
    };
    if (isOpen) {
      request();
    }
  }, [isOpen, workflowId]);

  function onFilter() {
    setProcesses([]);
  }

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>
        Lista de processos
        <S.CloseButton onClick={onClose} />
      </S.Title>
      <Form onClick={onFilter} />
      {console.log(onFilter, "onFilter")}
      <S.Content dividers>
        <List>
          {processes.map((process) => (
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
