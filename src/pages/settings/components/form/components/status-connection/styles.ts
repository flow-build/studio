import styled from "styled-components";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Message = styled.p`
  color: #fff;
`;

export const SuccessIcon = styled(CheckCircleIcon).attrs({
  color: "success",
})``;

export const ErrorIcon = styled(CancelIcon).attrs({
  color: "error",
})``;
