import styled from "styled-components";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";

export const DesktopDate = styled(DesktopDatePicker).attrs({})`
  display: flex;
`;

export const InputDate = styled(TextField).attrs({
  sx: {
    width: "25ch",
    m: 1,
  },
})``;
