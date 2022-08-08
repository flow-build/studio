import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { IconButton } from "shared/components/icon-button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export const Wrapper = styled(Dialog).attrs({
  "aria-labelledby": "List process dialog",
  "aria-describedby": "List all processes for the current workflow",
  scroll: "paper",
  fullWidth: true,
  maxWidth: "md",
})``;
export const InputContainer = styled("div")``;

export const Provider = styled(LocalizationProvider).attrs({
  dateAdapter: AdapterDateFns,
})``;

export const DatePicker = styled(DesktopDatePicker)``;

export const InputDate = styled(TextField)`
  /* background-color: green; */
  width: 14rem;
`;
export const DateContainer = styled("div")`
  /* background-color: red; */
  width: 35rem;
  display: flex;
  justify-content: space-around;
  margin-left: 0.2rem;
  margin-bottom: 1rem;
`;

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

export const SearchButton = styled(IconButton).attrs({
  icon: SearchIcon,
  ariaLabel: "search",
  tooltip: "pesquisar",
})``;

export const Text = styled(DialogContentText)``;

export const Content = styled(DialogContent)``;

export const RightArrow = styled(ArrowForwardIosIcon)``;
