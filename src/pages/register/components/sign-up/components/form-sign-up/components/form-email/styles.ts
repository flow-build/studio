import styled from "styled-components";

import { Button } from "shared/components/button";
import { InputText } from "shared/components/input-text";

export const Input = styled(InputText).attrs({
    fullWidth: true,
    required: true,
    sx: { mb: 2 },
  })``;

  export const IconContainer = styled.div`
  display: flex;
`;

export const SubmitButton = styled(Button).attrs({
    type: "submit",
    variant: "contained",
    fullWidth: true,
  })`
    height: 3.5rem;
  `;

  export const SubmitContainer = styled.div`
  display: flex,
  flex: 1,
  align-items: center,
  justify-content: center,
`;