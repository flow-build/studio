import React from "react";

import { useSidebar } from "pages/dashboard/components/sidebar/hooks/useSidebar";

// import * as S from './styles'

import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { TypeMenuItem } from "constants/type-menu-item";
import { MenuItemNavigation } from "./components/menu-item-navigation/menu-item-navigation";
import { MenuItemAction } from "./components/menu-item-action/menu-item-action";
import { ProcessIdSearch } from "./dialogs/process-id-search";

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
              <MenuItemNavigation
                key={index.toString()}
                pathname={menuItem.pathname}
                isOpen={isOpen}
                icon={menuItem.icon}
                name={menuItem.name}
              />
            ) : (
              <MenuItemAction
                onClick={menuItem.onClick}
                key={index.toString()}
                isOpen={isOpen}
                icon={menuItem.icon}
                name={menuItem.name}
              />
            )
          )}
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
