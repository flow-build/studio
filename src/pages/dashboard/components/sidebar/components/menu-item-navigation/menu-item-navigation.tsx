import { Link } from "react-router-dom";

import * as S from "../../styles";

type Props = {
  pathname: string;
  isOpen: boolean;
  icon: string;
  name: string;
  tooltip: string;
};

export const MenuItemNavigation: React.FC<Props> = ({
  pathname,
  isOpen,
  icon,
  name,
  tooltip,
}) => {
  return (
    <Link to={pathname}>
      <S.TooltipIcon title={!isOpen ? tooltip : ""}>
        <S.MenuItem
          sx={{
            minHeight: 48,
            justifyContent: isOpen ? "initial" : "center",
            px: 2.5,
          }}
        >
          <S.MenuIcon
            sx={{
              minWidth: 0,
              mr: isOpen ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {icon}
          </S.MenuIcon>
          <S.MenuText primary={name} sx={{ opacity: isOpen ? 1 : 0 }} />
        </S.MenuItem>
      </S.TooltipIcon>
    </Link>
  );
};
