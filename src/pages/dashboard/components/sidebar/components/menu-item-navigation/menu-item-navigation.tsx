import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";


type Props = {
  pathname: string;
  isOpen: boolean;
  icon: string;
  name: string;
};

export const MenuItemNavigation: React.FC<Props> = ({ pathname, isOpen, icon, name }) => {

  return (
    <Link to={pathname}>
      <ListItemButton
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
        <ListItemText
          primary={name}
          sx={{ opacity: isOpen ? 1 : 0 }}
        />
      </ListItemButton>
    </Link>
  );
};
