import styled from "styled-components";

import Box from "@mui/material/Box";
import DialogContentText from "@mui/material/DialogContentText";
import { List } from "@mui/material";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import BaseDivider from "@mui/material/Divider";

import { MenuItem as CMenuItem } from "pages/dashboard/components/sidebar/components/menu-item";
import { DrawerHeader as BaseDrawerHeader } from "pages/dashboard/components/sidebar/components/drawer-header";
import { Drawer as BaseDrawer } from "pages/dashboard/components/sidebar/components/drawer";

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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    mb: 4,
  },
})``;

export const DrawerHeader = styled(BaseDrawerHeader)``;

export const Drawer = styled(BaseDrawer).attrs({
  variant: "permanent",
})``;

export const Divider = styled(BaseDivider)``;

export const ConnectIcon = styled(ConnectWithoutContactIcon)``;
