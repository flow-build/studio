import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { TProcess } from "models/process";

import { listByWorkflowId } from "services/resources/processes/list-by-process-id";

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

  useEffect(() => {
    const request = async () => {
      const response = await listByWorkflowId(workflowId);
      setProcesses(response);
    };

    if (isOpen) {
      request();
    }
  });

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>Lista de processos</S.Title>

      <S.Content dividers>
        <List>
          {processes.map((process) => (
            <ListItem disablePadding>
              <ListItemButton onClick={() => onClickListItemButton(process)}>
                <ListItemText primary={process.id} secondary={process.status} />
                <S.RightArrow />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </S.Content>

      <DialogActions>
        <Button onClick={onClose}>Disagree</Button>
        <Button onClick={onClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </S.Wrapper>
  );
};
