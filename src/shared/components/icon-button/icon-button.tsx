import {SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";

import * as S from "./styles";

type Props = {
  tooltip?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  badge?: number;
};

export const IconButton: React.FC<Props> = ({
  icon: Icon,
  tooltip = "",
  badge,
  ...props
}) => {
  return (
    <S.Wrapper title={tooltip}>
      <S.Button {...props}>
        {badge && (
          <S.Notification badgeContent={badge} >
            <Icon />
          </S.Notification>
        )}

        {!badge && <Icon />}
      </S.Button>
    </S.Wrapper>
  );
};
