import * as S from "./styles";

type Props = {
  padding?: string | number;
  pt?: string | number;
};

export const Content: React.FC<Props> = ({ children, ...props }) => {
  return (
    <S.Wrapper sx={{ padding: props.padding, paddingTop: props.pt }}>
      {children}
    </S.Wrapper>
  );
};
