import styled from "styled-components";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { ViewList, ViewModule } from "@mui/icons-material";

export const ToggleContainer = styled(ToggleButtonGroup).attrs({
    exclusive: true,
  })`
    margin-left: auto;
  `;
  
  export const Toggle = styled(ToggleButton).attrs({})``;
  
  export const ListIcon = styled(ViewList).attrs({})``;
  
  export const ModuleIcon = styled(ViewModule).attrs({})``;
  