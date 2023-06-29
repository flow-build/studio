import MuiPagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import { MiniCards } from 'stories/components/MiniCardsCarousel/components/MiniCards';
import { spacing } from 'theme/spacing';

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const Title = styled('h2')`
  margin: ${spacing.S16} 0;
`;

export const List = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Card = styled(MiniCards)`
  background-color: ${({ theme }) => theme.palette.grey[100]};
  width: 20rem;
  padding: ${spacing.S16} ${spacing.S18};
  box-shadow: ${({ theme }) => theme.shadows[1]};
`;

export const Pagination = styled(MuiPagination)`
  align-self: center;
`;
