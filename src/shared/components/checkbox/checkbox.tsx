import { CheckboxProps } from "@mui/material";
import * as S from "./styles";

type Props = CheckboxProps;

export const CheckBox: React.FC<Props> = ({ ...props }) => {
  return (
    <S.Container>
      <S.Label control={<S.Wrapper {...props} />} label={props["aria-label"]} />
    </S.Container>
  );
};

