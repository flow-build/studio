import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { Button, InputPassword, InputText } from 'stories/components';
import { spacing } from 'theme/spacing';

export const Wrapper = styled('form')`
  display: flex;
  flex-direction: column;
  padding: ${spacing.S16} 0;
`;

export const GridContainer = styled('div')`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr;
  grid-template-rows: ${`repeat(2, ${spacing.S70})`};
  grid-template-areas:
    'NSP URL URL PRT'
    'USR PSW BTN .';
  column-gap: 10px;
  row-gap: 16px;
`;

export const NamespaceInput = styled(InputText)`
  grid-area: NSP;
`;

export const UrlInput = styled(InputText)`
  grid-area: URL;
`;

export const PortInput = styled(InputText)`
  grid-area: PRT;
`;

export const UsernameInput = styled(InputText)`
  grid-area: USR;
`;

export const PasswordInput = styled(InputPassword)`
  grid-area: PSW;
`;

export const RadioButton = styled(FormControlLabel)`
  grid-area: BTN;
  margin-left: ${spacing.S32};
`;

export const SubmitButton = styled(Button)`
  margin-top: ${spacing.S16};
  align-self: flex-start;
`;
