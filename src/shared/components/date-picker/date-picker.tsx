import * as S from "./styles";

type Props = {
  label?: string;
  inputFormat?: string;
  onChange?: (value: unknown, keyboardInputValue?: string | undefined) => void;
};

export const DatePicker: React.FC<Props> = ({ ...props }) => {
  return <S.Wrapper {...props} />;
};
