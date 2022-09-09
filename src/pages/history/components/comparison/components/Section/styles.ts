import styled from "styled-components";

import { IconButton } from 'shared/components/icon-button';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const BackProcessButton = styled(IconButton).attrs({
  icon: ArrowBackIosNewIcon, 
  tooltip: 'processo anterior', 
})``;
export const FowardProcessButton = styled(IconButton).attrs({
  icon: ArrowForwardIosIcon, 
  tooltip: 'próximo processo', 
})``;
