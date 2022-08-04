import styled from "styled-components";

import MuiTable from "@mui/material/Table";
import MuiTableBody from "@mui/material/TableBody";
import MuiTableCell from "@mui/material/TableCell";
import MuiTableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";
import MuiTableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import { CollapseTableBody } from "shared/components/table/components/collapse-table-body";

export const Wrapper = styled(TableContainer).attrs({
  component: Paper,
})`
  height: calc(100% - 54px);
`;

export const Table = styled(MuiTable).attrs({
  stickyHeader: true,
})``;

export const TableCell = styled(MuiTableCell)``;

export const TableBody = styled(MuiTableBody)``;

export const TableHead = styled(MuiTableHead)``;

export const TableRow = styled(MuiTableRow)``;

export const TableFooter = styled(MuiTableFooter)``;

export const TableBodyContent = styled(CollapseTableBody)``;

export const Pagination = styled(TablePagination).attrs({
  component: "div",
})``;
