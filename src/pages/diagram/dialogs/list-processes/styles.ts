import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Stack from "@mui/material/Stack";
import { IconButton } from "shared/components/icon-button";
import TextField from "@mui/material/TextField";

export const Wrapper = styled(Dialog).attrs({
  "aria-labelledby": "List process dialog",
  "aria-describedby": "List all processes for the current workflow",
  scroll: "paper",
  fullWidth: true,
  maxWidth: "md",
})``;

export const InputContainer = styled("div")``;

export const Provider = styled(LocalizationProvider)``;
export const StackDate = styled(Stack)``;
export const DatePicker = styled(StaticDatePicker)``;
export const InputDate = styled(TextField)``;
export const Title = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InputProcess = styled(TextField).attrs({
  variant: "outlined",
  sx: {
    m: 2,
    display: "inline-block",
    width: "25ch",
  },
})``;

export const CloseButton = styled(IconButton).attrs({
  icon: CloseIcon,
  ariaLabel: "close",
})``;

export const Text = styled(DialogContentText)``;

export const Content = styled(DialogContent)``;

export const RightArrow = styled(ArrowForwardIosIcon)``;
