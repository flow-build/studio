import styled from "styled-components";

import Box from "@mui/material/Box";
import DialogContentText from "@mui/material/DialogContentText";

export const VersionContainer = styled(Box).attrs({
    sx: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingRight: "10px",
      mb: 4,
    },
})``;

export const Text = styled(DialogContentText)``;
