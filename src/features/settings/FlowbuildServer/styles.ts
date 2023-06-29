import { styled } from '@mui/material/styles';
import { Button, InputText } from 'stories/components';
import { spacing } from 'theme/spacing';

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding: ${spacing.S16} 0;
`;

export const Row = styled('div')`
  display: flex;
  align-items: center;
  column-gap: ${spacing.S16};
`;

const inputOptions = {
  shouldForwardProp: (prop: string) => !['small'].includes(prop as string)
};
export const Input = styled(InputText, inputOptions)<{ small?: boolean }>`
  width: ${({ small }) => (small ? 12 : 24)}rem;
`;

export const SubmitButton = styled(Button)`
  margin-top: ${spacing.S16};
  align-self: flex-start;
`;
