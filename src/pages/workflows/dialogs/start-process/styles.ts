import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "shared/components/icon-button";

import CircularProgress from "@mui/material/CircularProgress";

export const Wrapper = styled(Dialog).attrs({
  "aria-labelledby": "Confirmation",
  "aria-describedby": "Confirm action",
  scroll: "paper",
  fullWidth: true,
  maxWidth: "md",
})``;

export const Title = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseButton = styled(IconButton).attrs({
  icon: CloseIcon,
  ariaLabel: "close",
})``;

export const Text = styled(DialogContentText)`
  width: 26rem;
`;

export const Loading = styled(CircularProgress).attrs({
  color: "inherit",
})``;
