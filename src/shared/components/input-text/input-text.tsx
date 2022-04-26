import { TextFieldProps } from '@mui/material';

import * as S from './styles'

type Props = TextFieldProps & {}

export const InputText: React.FC<Props> = ({ ...rest }) => {
  return <S.Wrapper {...rest} />
}