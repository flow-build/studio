import styled from "styled-components";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";

export const Wrapper = styled(Tooltip).attrs({
  arrow: true,
  placement: "right",
})``;

type TStyle = { isOpen: boolean };

export const MenuItem = styled(ListItemButton).attrs(({ isOpen }: TStyle) => ({
  sx: {
    justifyContent: isOpen ? "initial" : "center",
    px: 2.5,
    minHeight: 48,
  },
}))<TStyle>``;

export const MenuIcon = styled(ListItemIcon).attrs(({ isOpen }: TStyle) => ({
  sx: {
    mr: isOpen ? 3 : "auto",
    minWidth: 0,
    justifyContent: "center",
  },
}))<TStyle>``;

export const MenuText = styled(ListItemText).attrs(({ isOpen }: TStyle) => ({
  sx: { opacity: isOpen ? 1 : 0 },
}))<TStyle>``;
