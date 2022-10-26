import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type TAction = {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  badge?: number;
  tooltip?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

