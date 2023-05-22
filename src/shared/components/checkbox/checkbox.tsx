import { CheckboxProps } from "@mui/material";
import * as S from "./styles";

type Props = CheckboxProps;

export const CheckBox: React.FC<Props> = ({ ...props }) => {
  return (
    <S.Wrapper>
      <S.Label
        control={<S.CheckboxControl {...props} />}
        label={props["aria-label"]}
      />
    </S.Wrapper>
  );
};

