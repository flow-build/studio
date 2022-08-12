import React from "react";
import { Link } from "react-router-dom";

import { styled, Theme, CSSObject } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import MuiDrawer from "@mui/material/Drawer";

import { TypeMenuItem } from "constants/type-menu-item";

import { useSidebar } from "pages/dashboard/components/sidebar/hooks/useSidebar";
import { ProcessIdSearch } from "pages/dashboard/components/sidebar/dialogs/process-id-search";

import * as S from "./styles";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type Props = {
  isOpen: boolean;
};

export const Sidebar: React.FC<Props> = ({ isOpen }) => {
  const sidebar = useSidebar();

  return (
    <>
      <Drawer variant="permanent" open={isOpen}>
        <DrawerHeader />
        <Divider />
        <List>
          {sidebar.menuItems.map((menuItem, index) =>
            menuItem.type === TypeMenuItem.NAVIGATION ? (
              <Link key={index.toString()} to={menuItem.pathname}>
                <S.MenuItem
                  isOpen={isOpen}
                  icon={menuItem.icon}
                  name={menuItem.name}
                  tooltip={menuItem.tooltip}
                />
              </Link>
            ) : (
              <S.MenuItem
                key={index.toString()}
                onClick={menuItem.onClick}
                isOpen={isOpen}
                icon={menuItem.icon}
                name={menuItem.name}
                tooltip={menuItem.tooltip}
              />
            )
          )}
          {/* CONFIGURAÇÕES AQUI */}
        </List>
      </Drawer>

      {sidebar.isOpenDialog && (
        <ProcessIdSearch
          isOpen={sidebar.isOpenDialog}
          onClose={sidebar.onCloseDialog}
        />
      )}
    </>
  );
};

