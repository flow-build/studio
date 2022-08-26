import { MouseEventHandler } from "react";

import * as S from "./styles";

type Props = {
  onClick?: MouseEventHandler<HTMLDivElement>;
  isOpen: boolean;
  icon: string;
  name: string;
  tooltip: string;
};

export const MenuItem: React.FC<Props> = (props) => {
  return (
    <S.Wrapper title={!props.isOpen ? props.tooltip : ""}>
      <S.MenuItem onClick={props.onClick} isOpen={props.isOpen}>
        <S.MenuIcon isOpen={props.isOpen}>{props.icon}</S.MenuIcon>
        <S.MenuText primary={props.name} isOpen={props.isOpen} />
      </S.MenuItem>
    </S.Wrapper>
  );
};
