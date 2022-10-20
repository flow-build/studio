import { BadgeTypeMap, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";

// import { VisibilityOutlined, ExtensionOutlined, AddOutlined, ViewList, ViewModule } from '@mui/icons-material';

import * as S from "./styles";

type Props = {
  tooltip?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  badge?: OverridableComponent<BadgeTypeMap<"span", {}>>;
};

export const IconButton: React.FC<Props> = ({
  icon: Icon,
  tooltip = "",
  ...props
}) => {
  return (
    <S.Wrapper title={tooltip}>
      <S.Button {...props}>
        <S.Notification badgeContent={0} variant="dot">
          <Icon />
        </S.Notification>
      </S.Button>
    </S.Wrapper>
  );
};
