import styled from "styled-components";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiTable from "@mui/material/Table";
import MuiTableCell from "@mui/material/TableCell";
import MuiTableBody from "@mui/material/TableBody";
import MuiTableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";


export const BoxTable = styled(Box).attrs({
  margin: 1,
  mr: 6,
  mb: 6,
  display: "inline-block",
  justifyContent: "space-around",
  width: 400,
  height: 400,
})``;

export const TitleTable = styled(Typography).attrs({
  variant: "h6",
  component: "p",
  gutterBottom: true,
  display: "inline-block",
})``;

export const TextTable = styled(Typography).attrs({
  variant: "caption",
  component: "p",
})``;

export const Table = styled(MuiTable)`
  size: "small";
`;
export const TableCell = styled(MuiTableCell)``;

export const TableBody = styled(MuiTableBody)``;

export const TableHead = styled(MuiTableHead)``;

export const TableRow = styled(MuiTableRow)``;
