import React, { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { TProcess } from "models/process";

import { listByWorkflowId } from "services/resources/processes/list-by-process-id";

import { getLongFormatByDate } from "shared/utils/date";
import AdapterDateFns from "@mui/x-date-pickers/AdapterDateFns";

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

  const onChangeProcesses = (
    value: string,
    campo: "Status" | "NodeId" | "CreatedAt"
  ) => {
    setProcesses((prev) => ({ ...prev, [campo]: value }));
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

  const [value, setValue] = React.useState<Date | any>(
    new Date("2014-08-18T21:11:54")
  );

  const handleChange = (newValue: Date | any) => {
    setValue(newValue);
  };

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>
        Lista de processos
        <S.CloseButton onClick={onClose} />
      </S.Title>

      <S.InputContainer>
        <S.InputProcess
          label="node id"
          value={processes}
          onChange={(event) => {
            onChangeProcesses(event.target.value, "NodeId");
          }}
        >
          node_id
        </S.InputProcess>
        <S.InputProcess
          label="status"
          value={processes}
          onChange={(event) => {
            onChangeProcesses(event.target.value, "Status");
          }}
        >
          status
        </S.InputProcess>
      </S.InputContainer>

      <S.Provider dateAdapter={AdapterDateFns}>
        <S.StackDate spacing={3}>
          <S.DatePicker
            label="Date desktop"
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params: any) => <S.InputDate {...params} />}
          />
        </S.StackDate>
      </S.Provider>

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
