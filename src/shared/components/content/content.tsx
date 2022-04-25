import * as S from './styles'

type Props = {
  padding?: string | number;
}

export const Content: React.FC<Props> = ({ children, ...props }) => {
  return (
    <S.Wrapper sx={{ padding: props.padding }}>
      {children}
    </S.Wrapper>
  )
}