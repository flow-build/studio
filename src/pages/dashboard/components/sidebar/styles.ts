import styled from "styled-components";

import Box from "@mui/material/Box";
import DialogContentText from "@mui/material/DialogContentText";

import { MenuItem as CMenuItem } from "pages/dashboard/components/sidebar/components/menu-item";
import { List } from "@mui/material";

export const MenuItem = styled(CMenuItem)``;

export const CustomList = styled(List)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Text = styled(DialogContentText)``;

export const VersionContainer = styled(Box).attrs({
  sx: {
    display: "flex",
    justifyContent: "center",
    mb: 4,
  },
})``;
