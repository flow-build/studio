import styled from "styled-components";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import CloseIcon from "@mui/icons-material/Close";

import { IconButton } from "shared/components/icon-button";
import { Divider } from "@mui/material";

export const ConfirmationDeleteWrapper = styled(Dialog).attrs({
  fullWidth: true,
  maxWidth: "sm",
  scroll: "paper",
})``;

export const Background = styled.div`
  background-color: #161826;
`;

export const Title = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseButton = styled(IconButton).attrs({
  icon: CloseIcon,
  ariaLabel: "close",
})``;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const CancelDelete = styled(Button).attrs({
  title: "cancelar",
  variant: "text",
})``;

export const ConfirmDeleteButton = styled(Button).attrs({
    title: "salvar",
    variant: "text",
})``;

export const ConfirmationDeleteDivider = styled(Divider)``;
export const DividerButton = styled(Divider).attrs({
  orientation: "vertical",
  flexItem: true,
})``;
