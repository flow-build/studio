import styled from "styled-components";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiTable from "@mui/material/Table";
import MuiTableCell from "@mui/material/TableCell";
import MuiTableBody from "@mui/material/TableBody";
import MuiTableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AceEditor from "react-ace/";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ace";

export const BoxTable = styled(Box).attrs({
  margin: 1,
  mr: 6,
  mb: 6,
  display: "inline-block",
  justifyContent: "space-between",
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

export const CopyIcon = styled(IconButton).attrs({
  icon: { ContentCopyOutlinedIcon },
  sx: {
    tooltip: "copiar",
  },
})``;

export const Table = styled(MuiTable)`
  size: "small";
`;
export const TableCell = styled(MuiTableCell)``;

export const TableBody = styled(MuiTableBody)``;

export const TableHead = styled(MuiTableHead)``;

export const TableRow = styled(MuiTableRow)``;

export const Editor = styled(AceEditor).attrs({
  mode: "json",
  theme: "dracula",
  setOptions: {
    overwrite: false,
    showPrintMargin: false,
    copyWithEmptySelection: true,
    readOnly: true,
  },
  height: "400px",
  width: "400px",
})``;
