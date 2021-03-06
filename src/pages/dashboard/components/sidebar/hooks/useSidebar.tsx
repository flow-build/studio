import { useMemo, useState } from "react";

import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SchemaIcon from "@mui/icons-material/Schema";
import SearchIcon from "@mui/icons-material/Search";
import { TypeMenuItem } from "constants/type-menu-item";

interface IMenuItem {
  name: string;
  pathname: string;
  icon: any;
  type: TypeMenuItem;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
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
        name: "Workflows",
        pathname: "workflows",
        icon: <SchemaIcon />,
        type: TypeMenuItem.NAVIGATION,
      },
      {
        name: "Comparar States",
        pathname: "compare-json",
        icon: <CompareArrowsIcon />,
        type: TypeMenuItem.NAVIGATION,
      },
      {
        name: "Buscar",
        onClick: openSearchDialog,
        icon: <SearchIcon />,
        type: TypeMenuItem.OPEN_DIALOG,
      },
    ] as IMenuItem[];
  }, []);

  return { menuItems, isOpenDialog, onCloseDialog };
}
