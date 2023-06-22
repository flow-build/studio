import { styled } from '@mui/material/styles';
import { MiniCards } from 'stories/components/MiniCardsCarousel/components/MiniCards';
import { spacing } from 'theme/spacing';

export const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Card = styled(MiniCards)`
  background-color: ${({ theme }) => theme.palette.grey[100]};
  width: 20rem;
  padding: ${spacing.S16} ${spacing.S18};
  box-shadow: ${({ theme }) => theme.shadows[1]};
`;
