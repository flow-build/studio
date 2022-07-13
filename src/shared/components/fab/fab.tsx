import React, { useState } from "react";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { IAction } from "shared/components/fab/types/IAction";

import * as S from "./styles";

type Props = {
  actions: IAction[];
};

export const Fab: React.FC<Props> = ({ actions }) => {
  const [isOpen, setIsOpen] = useState(false);

  function onFabClick() {
    setIsOpen(!isOpen);
  }

  return (
    <S.Wrapper
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", top: 0, right: 16 }}
      icon={<SpeedDialIcon icon={<MenuIcon />} openIcon={<CloseIcon />} />}
      direction="down"
      open={isOpen}
      onClick={onFabClick}
    >
      {actions.map((action, index) => (
        <S.Action
          key={index.toString()}
          icon={action.icon}
          tooltipTitle={action.tooltip}
          onClick={action.onClick}
        />
      ))}
    </S.Wrapper>
  );
};
