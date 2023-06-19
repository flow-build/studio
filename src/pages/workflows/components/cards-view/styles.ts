import styled from "styled-components";

import { CardsInfo } from "shared/components/cards-info";
import { Grid } from "@mui/material";

export const Wrapper = styled(Grid)`
  padding: 16px;
  padding-right: 0;
  padding-top: 0;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 8px;

  height: calc(100% - 168px);
  overflow-y: auto;
`;

export const Cards = styled(CardsInfo)``;
