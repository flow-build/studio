import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const Wrapper = styled(Dialog).attrs({
  "aria-labelledby": "Show properties",
  "aria-describedby": "Show all properties of shape",
  scroll: "paper",
  fullWidth: true,
  maxWidth: "md",
})``;

export const Title = styled(DialogTitle)``;

export const Text = styled(DialogContentText)``;

export const Content = styled(DialogContent)``;
