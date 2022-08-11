import styled from "styled-components";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ptBRLocale from "date-fns/locale/pt-BR";

import TextField from "@mui/material/TextField";

import { DatePicker } from "shared/components/date-picker/date-picker";
import { ptBR } from "@mui/x-data-grid";

import { Button } from "shared/components/button";

export const Wrapper = styled.div``;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
`;

export const Provider = styled(LocalizationProvider).attrs({
  dateAdapter: AdapterDateFns,
  adapterLocale: ptBRLocale,
  localeText: ptBR,
})``;

export const DatePickerInput = styled(DatePicker)``;

export const InputProcess = styled(TextField).attrs({
  variant: "outlined",
  sx: {
    m: 1,
    width: "25ch",
  },
})``;

export const SearchButton = styled(Button).attrs({
  title: "pesquisar",
  sx: {
    m: 2,
  },
})``;

export const ClearButton = styled(Button).attrs({
  title: "limpar filtro",
  color: "error",
  sx: {
    ml: 38,
  },
})``;

export const Buttons = styled.div``;
