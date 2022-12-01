import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

import { IconButton } from "shared/components/icon-button";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";

export const Wrapper = styled(Dialog).attrs({
  fullWidth: true,
  maxWidth: "sm",
  scroll: "paper",
})``;

export const ConfirmationBackground = styled.div`
  background-color: #161826;
`;

export const ConfirmationTitle = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseConfirmationButton = styled(IconButton).attrs({
  icon: CloseIcon,
  ariaLabel: "close",
})``;

export const ConfirmationContent = styled(DialogContent)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const EditDiagramButton = styled(Button).attrs({
  title: "salvar",
  variant: "text",
})``;

export const SaveNewDiagramButton = styled(Button).attrs({
  title: "cancelar",
  variant: "text",
})``;

export const ButtonWrapperConfirmation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const ConfirmationDivider = styled(Divider)``;

export const ButtonConfirmationDivider = styled(Divider).attrs({
  orientation: "vertical",
  flexItem: true,
})``;
