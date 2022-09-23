import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

import { IconButton } from "shared/components/icon-button";
import { Input } from "shared/components/content-header/styles";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";

export const DiagramWrapper = styled(Dialog).attrs({
  fullWidth: true,
  maxWidth: "sm",
  scroll: "paper",
})``;

export const DiagramBackground = styled.div`
  background-color: #161826;
`;

export const DiagramTitle = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseDiagramButton = styled(IconButton).attrs({
  icon: CloseIcon,
  ariaLabel: "close",
})``;

export const DiagramContent = styled(DialogContent)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DiagramInput = styled(Input).attrs({
  variant: "outlined",
  label: "Nome do diagrama",
  sx: {
    mt: 5,
    width: "50ch",
  },
})``;

export const SaveDiagramButton = styled(Button).attrs({
  title: "salvar",
  variant: "text",
})``;

export const CancelDiagramButton = styled(Button).attrs({
  title: "cancelar",
  variant: "text",
})``;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const DiagramDivider = styled(Divider)``;
export const ButtonDivider = styled(Divider).attrs({
  orientation: "vertical",
  flexItem: true,
})``;
