import styled from "styled-components";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";

export const Wrapper = styled(Tooltip)``;

export const Button = styled(IconButton)``;

export const Notification = styled(Badge).attrs({
  color: "primary",
})``;
