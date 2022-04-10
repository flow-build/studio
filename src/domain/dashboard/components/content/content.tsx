import * as S from './styles'

export const Content: React.FC<{}> = ({ children }) => {
  return (
    <S.Wrapper>
      {children}
    </S.Wrapper>
  )
}