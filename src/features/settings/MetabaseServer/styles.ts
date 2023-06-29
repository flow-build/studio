import { styled } from '@mui/material/styles';
import { Button } from 'stories/components';
import { spacing } from 'theme/spacing';

export const Wrapper = styled('form')`
  display: flex;
  flex-direction: column;
  padding: ${spacing.S16} 0;
`;

export const InputsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${spacing.S12};
`;

export const SubmitButton = styled(Button)`
  margin-top: ${spacing.S16};
  align-self: flex-start;
`;
