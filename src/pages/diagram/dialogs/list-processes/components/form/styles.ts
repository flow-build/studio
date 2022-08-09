import styled from "styled-components";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "shared/components/icon-button";

export const Wrapper = styled.div``;

export const InputContainer = styled.div``;

export const Provider = styled(LocalizationProvider).attrs({
  dateAdapter: AdapterDateFns,
})``;

export const DatePicker = styled(DesktopDatePicker)``;

export const InputDate = styled(TextField)`
  /* background-color: green; */
  width: 14rem;
`;

export const InputProcess = styled(TextField).attrs({
  variant: "outlined",
  sx: {
    m: 2,
    display: "inline-block",
    width: "25ch",
  },
})``;

export const SearchButton = styled(IconButton).attrs({
  icon: SearchIcon,
  ariaLabel: "search",
  tooltip: "pesquisar",
})``;

export const DateContainer = styled.div`
  /* background-color: red; */
  width: 35rem;
  display: flex;
  justify-content: space-around;
  margin-left: 0.2rem;
  margin-bottom: 1rem;
`;
