import styled from "styled-components";

import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export const Wrapper = styled(Grid).attrs({
  container: true,
  spacing: 2,
  sx: {
    marginTop: 0,
  },
})`
  margin: 1rem;
  height: calc(100% - 64px);
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
`;

export const List = styled.ul``;

export const Items = styled.li``;

export const BoxContent = styled(Box).attrs({
  sx: {
    width: 300,
    height: 160,
    backgroundColor: "#2e353b",
  },
})`
  margin: 2rem;
`;

export const Title = styled(Typography).attrs({
  variant: "h6",
})`
  padding-top: 1rem;
  padding-left: 1rem;
`;

export const Text = styled.p`
  color: #fff;
  margin-top: 1.3rem;
  padding-left: 1rem;
  font-size: x-large;
`;

export const BoxText = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Percentage = styled.p`
  color: #fff;
  padding-left: 1rem;
  font-size: medium;
`;

export const Period = styled.p`
  color: #fff;
  padding-left: 1rem;
  font-size: medium;
`;

