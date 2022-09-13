import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

import { IconButton } from "shared/components/icon-button";
import { Input } from "shared/components/content-header/styles";
import { Button } from "shared/components/button";

export const Wrapper = styled(Dialog).attrs({
  "aria-labelledby": "Save diagram",
  "aria-describedby": "Save diagram",
  scroll: "paper",
  fullWidth: true,
  maxWidth: "sm",
})``;

export const DiagramTitle = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseDiagramButton = styled(IconButton).attrs({
  icon: CloseIcon,
  ariaLabel: "close",
})``;

export const DiagramContent = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem;
`;

export const DiagramInput = styled(Input).attrs({
    variant: 'outlined',
    label: 'Nome do diagrama',
    sx: {
        m: 15,
        mt: 5,
        width: "30ch",
      },
})``;

export const SaveDiagramButton = styled(Button).attrs({
    title: "salvar",
    sx: {
      mt: 20,
    },
})``;