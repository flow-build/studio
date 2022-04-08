import { TextFieldProps } from '@mui/material';
import { InputHTMLAttributes } from 'react';
import * as S from './styles'

type Props = TextFieldProps & {}

export const InputText: React.FC<Props> = ({ ...rest }) => {
  return <S.Wrapper {...rest} />
}