import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const Wrapper = styled(Dialog).attrs({
  "aria-labelledby": "List process dialog",
  "aria-describedby": "List all processes for the current workflow",
  scroll: "paper",
  fullWidth: true,
  maxWidth: "md",
})``;

export const Title = styled(DialogTitle)``;

export const Text = styled(DialogContentText)``;

export const Content = styled(DialogContent)``;

export const RightArrow = styled(ArrowForwardIosIcon)``;
