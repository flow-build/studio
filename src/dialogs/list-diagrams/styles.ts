import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { IconButton } from "shared/components/icon-button";

export const ListDiagramsWrapper = styled(Dialog).attrs({
  "aria-labelledby": "List diagram dialog",
  "aria-describedby": "List all diagrams for the current workflow",
  scroll: "paper",
  fullWidth: true,
  maxWidth: "md",
})``;

export const ListTitle = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseListButton = styled(IconButton).attrs({
  icon: CloseIcon,
  ariaLabel: "close",
})``;

export const Content = styled(DialogContent)``;

export const ListDiagram = styled(List)``;
export const ItemDiagram = styled(ListItem)``;
export const ItemButton = styled(ListItemButton)``;
export const TextDiagram = styled(ListItemText)``;

export const RightArrowList = styled(ArrowForwardIosIcon)``;
