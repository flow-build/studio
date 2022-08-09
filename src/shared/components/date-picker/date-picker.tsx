import * as S from "./styles";
import { TextFieldProps } from "@mui/material";

type Props = {
  label?: string;
  inputFormat?: string;
  value?: any;
  onChange?: (value: unknown, keyboardInputValue?: string | undefined) => void;
  renderInput?: (
    props: TextFieldProps
  ) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  componentsProps: {
    actionBar: { actions: ["clear"]};
  };
};

export const DatePicker: React.FC<Props> = ({ ...props }) => {
  return <S.Wrapper {...props} />;
};
