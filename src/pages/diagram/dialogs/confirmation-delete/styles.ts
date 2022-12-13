import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";


export const ConfirmationDeleteWrapper = styled(Dialog).attrs({
  fullWidth: true,
  maxWidth: "sm",
  scroll: "paper",
})``;

export const Background = styled.div`
  background-color: #161826;
`;

export const Title = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

