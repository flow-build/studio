import { BadgeTypeMap, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type TAction = {
  badge: OverridableComponent<BadgeTypeMap<"span", {}>>;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  tooltip?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};
