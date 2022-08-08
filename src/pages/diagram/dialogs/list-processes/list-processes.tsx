import React, { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { TProcess } from "models/process";
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
}) => {
  const [processes, setProcesses] = useState<TProcess[]>([]);

  const [searchProcess, setSearchProcess] = useState<Date | any>({
    status: "",
    nodeId: "",
    initialDate: "",
    finalDate: "",
  });

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

  const onChangeProcesses = (
    value: string,
    campo: "status" | "nodeId" | "initialDate" | "finalDate"
  ) => {
    setSearchProcess((prev: any) => ({ ...prev, [campo]: value }));
  };

  useEffect(() => {
    const request = async () => {
      const response = await listByWorkflowId(workflowId);
      setProcesses(response);
    };
    if (isOpen) {
      request();
    }
  }, [isOpen, workflowId]);

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>
        Lista de processos
        <S.CloseButton onClick={onClose} />
      </S.Title>
      <S.InputContainer>
        <S.InputProcess
          label="node id"
          value={searchProcess?.nodeId}
          onChange={(event) => {
            onChangeProcesses(event.target.value, "nodeId");
          }}
        >
          node_id
        </S.InputProcess>
        <S.InputProcess
          label="status"
          value={searchProcess?.status}
          onChange={(event) => {
            onChangeProcesses(event.target.value, "status");
          }}
        >
          status
        </S.InputProcess>
      </S.InputContainer>
      <S.DateContainer>
        <S.Provider>
          <S.DatePicker
            label="Data inicial"
            inputFormat="MM/dd/yyyy"
            value={searchProcess?.initialDate}
            onChange={(event: any) => {
              onChangeProcesses(event.target.value, "initialDate");
            }}
            renderInput={(params: any) => <S.InputDate {...params} />}
          />
          <S.DatePicker
            label="Data final"
            inputFormat="MM/dd/yyyy"
            value={searchProcess?.finalDate}
            onChange={(event: any) => {
              onChangeProcesses(event.target.value, "finalDate");
            }}
            renderInput={(params: any) => <S.InputDate {...params} />}
          />
          <S.SearchButton />
        </S.Provider>
      </S.DateContainer>

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
