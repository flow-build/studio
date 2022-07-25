import { MouseEventHandler } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

type Props = {
  onClick?: MouseEventHandler<HTMLDivElement>;
  isOpen: boolean;
  icon: string;
  name: string;
};

export const MenuItemAction: React.FC<Props> = ({
  onClick,
  isOpen,
  icon,
  name,
}) => {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        minHeight: 48,
        justifyContent: isOpen ? "initial" : "center",
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : "auto",
          justifyContent: "center",
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText primary={name} sx={{ opacity: isOpen ? 1 : 0 }} />
    </ListItemButton>
  );
};
