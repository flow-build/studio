import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

import { IconButton } from "shared/components/icon-button";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";

export const DeleteWrapper = styled(Dialog).attrs({
  fullWidth: true,
  maxWidth: "sm",
  scroll: "paper",
})``;

export const DiagramDeleteBackground = styled.div`
  background-color: #161826;
`;

export const DiagramDeleteTitle = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseDiagram = styled(IconButton).attrs({
  icon: CloseIcon,
  ariaLabel: "close",
})``;

export const DeleteDiagramButton = styled(Button).attrs({
  title: "salvar",
  variant: "text",
})``;

export const CancelButton = styled(Button).attrs({
  title: "cancelar",
  variant: "text",
})``;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const DeleteDivider = styled(Divider)``;

export const DeleteButtonDivider = styled(Divider).attrs({
  orientation: "vertical",
  flexItem: true,
})``;
