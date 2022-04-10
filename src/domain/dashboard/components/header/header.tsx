import * as S from './styles'

export const Header: React.FC = () => {
  return (
    <S.Wrapper>
      <S.Logo />
      <S.Avatar alt="Brad Gibson" src="https://randomuser.me/api/portraits/thumb/men/75.jpg" />
    </S.Wrapper>
  );
}