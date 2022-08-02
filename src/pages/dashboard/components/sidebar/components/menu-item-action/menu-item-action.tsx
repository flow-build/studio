import { MouseEventHandler } from "react";

import * as S from "../../styles";

type Props = {
  onClick?: MouseEventHandler<HTMLDivElement>;
  isOpen: boolean;
  icon: string;
  name: string;
  tooltip: string;
};

export const MenuItemAction: React.FC<Props> = ({
  onClick,
  isOpen,
  icon,
  name,
  tooltip,
}) => {
  return (
    <S.TooltipIcon title={!isOpen ? tooltip : ""}>
      <S.MenuItem
        onClick={onClick}
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
  );
};
