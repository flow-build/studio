import styled from "styled-components";

import { GridWrapper } from "pages/auth/components/grid-wrapper";

import { Button } from "shared/components/button";
import { InputText } from "shared/components/input-text";

export const Wrapper = styled(GridWrapper)``;

export const Input = styled(InputText).attrs({
  label: "E-mail",
  type: "text",
  name: "email",
  placeholder: "Type your registered e-mail",
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

export const SubmitButton = styled(Button).attrs({
  fullWidth: true,
  type: "submit",
  variant: "contained",
})`
  height: 3.5rem;
`;

export const ResendCodeButton = styled(Button).attrs({
  fullWidth: true,
  variant: "contained",
})`
  height: 3.5rem;
`;

export const BackButton = styled(Button).attrs({
  type: "button",
  title: "Back",
  variant: "outlined",
  fullWidth: true,
})`
  height: 3.5rem;
`;
