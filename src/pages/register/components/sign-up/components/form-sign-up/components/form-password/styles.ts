import styled from "styled-components";

import DialogContentText from "@mui/material/DialogContentText";
// import { ArrowBack } from "@mui/icons-material";

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
  gap:5px;
`;

export const SubmitButton = styled(Button).attrs({
    type: "submit",
    title: "Submit",
    variant: "contained",
    fullWidth: true,
})`
    height: 3.5rem;
  `;

export const Text = styled(DialogContentText)`
`;

export const PasswordItens = styled.div<{ isDisabled: boolean }>`
    background-color: ${({ isDisabled }) => (isDisabled ? "#1E4F9F" : "#252A41")};
    padding:5px;
    gap:5px;
    border-radius: 100px;
    display: flex;
    align-items: center
`;

export const PasswordContainer = styled.div`
    display:flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 5px;
    padding-bottom: 15px;
`;

// export const BackButton = styled(ArrowBack).attrs({
//     sx: { color: "#2D77EF", fontSize: 30 }
// })`
// padding: 5px;
// `;

export const BackButton = styled(Button).attrs({
    type: "submit",
    title: "Back",
    variant: "outlined",
    fullWidth: true,
})`
    height: 3.5rem;
  `;
