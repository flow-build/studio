import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { DialogActions } from "@mui/material";

import { IPayload } from "pages/dashboard/components/sidebar/dialogs/process-id-search/types/IPayload";

import { listStatesByProcessId } from "services/resources/processes/list-states";

import { setProcessSelected } from "store/slices/diagram";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ProcessIdSearch: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState<IPayload>({
    processId: "",
  });

  const onChangePayload = (valor: string, campo: "processId" | "option") => {
    setPayload((prev) => ({ ...prev, [campo]: valor }));
  };

  async function handleClickProcessId() {
    const response = await listStatesByProcessId(payload.processId);

    dispatch(setProcessSelected(response));

    navigate(`/dashboard/workflows/${response.workflow_id}/diagram`);
    onClose();
  }

  return (
    <S.Dialog open={isOpen} onClose={onClose}>
      <S.Title>Consultar </S.Title>

      <S.Content>
        <S.DialogText>
          Insira o id do processo a qual deseja ver as informações
        </S.DialogText>

        <S.Input
          value={payload?.processId}
          onChange={(event) => onChangePayload(event.target.value, "processId")}
        />
      </S.Content>

      <DialogActions>
        <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>
        <S.SearchButton onClick={handleClickProcessId}>
          Pesquisar
        </S.SearchButton>
      </DialogActions>
    </S.Dialog>
  );
};
