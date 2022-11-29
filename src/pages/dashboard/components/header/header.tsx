import React from "react";
import { useNavigate } from "react-router-dom";

import { Auth } from "aws-amplify";

import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import * as S from "./styles";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type Props = {
  isOpen: boolean;
  onMenuClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Header: React.FC<Props> = ({ isOpen, onMenuClick }) => {
  const navigate = useNavigate();
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchor(event.currentTarget);
  }

  async function handleClose() {
    try {
      await Auth.signOut();
      navigate("/");
      setAnchor(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AppBar position="fixed" open={isOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
          sx={{ marginRight: 5 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Flowbuild - Studio
        </Typography>

        <S.Avatar
          alt="Brad Gibson"
          src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
          onClick={handleClick}
        />

        <S.MenuList
          anchorEl={anchor}
          open={open}
          onClose={() => setAnchor(null)}
        >
          <S.MenuItemList onClick={handleClose}>Logout</S.MenuItemList>
        </S.MenuList>
      </Toolbar>
    </AppBar>
  );
};
