import * as S from './styles'

type Props = {
  title: string;
  fullWidth?: boolean;

  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Button: React.FC<Props> = ({ title, ...props }) => {
  return (
    <S.Wrapper {...props}>
      {title}
    </S.Wrapper>
  );
}