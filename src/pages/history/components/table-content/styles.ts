import styled from "styled-components";

import AceEditor from "react-ace/";

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";

import Box from "@mui/material/Box";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import IconButton from "@mui/material/IconButton";
import MuiTable from "@mui/material/Table";
import MuiTableBody from "@mui/material/TableBody";
import MuiTableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

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

export const CopyIcon = styled(IconButton)``;
export const CopyOutlinedIcon = styled(ContentCopyOutlinedIcon)``;
export const TooltipIcon = styled(Tooltip)``;

export const Table = styled(MuiTable)`
  size: "small";
`;

export const TableBody = styled(MuiTableBody)``;

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
