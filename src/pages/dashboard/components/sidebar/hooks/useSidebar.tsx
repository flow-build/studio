import { useMemo, useState } from "react";

import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SchemaIcon from "@mui/icons-material/Schema";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import { TypeMenuItem } from "constants/type-menu-item";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { listNodes } from "services/resources/nodes/nodes";

interface IMenuItem {
  name: string;
  pathname: string;
  icon: any;
  type: TypeMenuItem;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  tooltip: string;
}

export function useSidebar() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  function openSearchDialog() {
    setIsOpenDialog(true);
  }

  function onCloseDialog() {
    setIsOpenDialog(false);
  }

  const menuItems = useMemo(() => {
    return [
      {
        name: "Dashboard",
        pathname: "/dashboard",
        icon: <DashboardIcon />,
        type: TypeMenuItem.NAVIGATION,
        tooltip: "Dashboard",
      },
      {
        name: "Workflows",
        pathname: "workflows",
        icon: <SchemaIcon />,
        type: TypeMenuItem.NAVIGATION,
        tooltip: "Workflows",
      },
      {
        name: "Comparar States",
        pathname: "compare-json",
        icon: <CompareArrowsIcon />,
        type: TypeMenuItem.NAVIGATION,
        tooltip: "Comparar States",
      },
      {
        name: "Buscar",
        onClick: openSearchDialog,
        icon: <SearchIcon />,
        type: TypeMenuItem.OPEN_DIALOG,
        tooltip: "Buscar",
      },
      {
        name: "Nodes",
        pathname: "nodes",
        icon: <AccountTreeIcon />,
        type: TypeMenuItem.NAVIGATION,
        tooltip: "Configurações",
      },
      {
        name: "Configurações",
        pathname: "settings",
        icon: <SettingsIcon />,
        type: TypeMenuItem.NAVIGATION,
        tooltip: "Configurações",
      },
    ] as IMenuItem[];
  }, []);

  return { menuItems, isOpenDialog, onCloseDialog };
}
