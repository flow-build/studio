import styled from "styled-components";

import { Button } from "shared/components/button";
import { InputText } from "shared/components/input-text";

export const Input = styled(InputText).attrs({
  fullWidth: true,
  required: true,
  sx: { mb: 2 },
})``;

export const SubmitContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 5px;

  margin: 20px 0 20px;
`;

export const BackButton = styled(Button).attrs({
  type: "button",
  title: "Back",
  variant: "outlined",
  fullWidth: true,
})`
  height: 3.5rem;
`;

export const SubmitButton = styled(Button).attrs({
  fullWidth: true,
  variant: "contained",
})`
  height: 3.5rem;
`;

export const ResendCodeButton = styled(Button).attrs({
  title: "Resend code",
  fullWidth: true,
  variant: "outlined",
})`
  height: 3.5rem;
`;
