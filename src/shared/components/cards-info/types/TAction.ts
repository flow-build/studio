import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type TAction = {
  badge?: number;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  tooltip?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};
