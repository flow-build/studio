import { useMemo, useState } from "react";

import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SchemaIcon from "@mui/icons-material/Schema";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import { TypeMenuItem } from "constants/type-menu-item";
import Icon from "shared/components/icon/icon";
import Nodes from "assets/icons/nodes.svg";

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
        name: "Compare State",
        pathname: "compare-json",
        icon: <CompareArrowsIcon />,
        type: TypeMenuItem.NAVIGATION,
        tooltip: "Compare State",
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
        icon: <Icon src="nodes" icon={Nodes} />,
        type: TypeMenuItem.NAVIGATION,
        tooltip: "Nodes",
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

