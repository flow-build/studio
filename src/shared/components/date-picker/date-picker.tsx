import * as S from "./styles";

type Props = {
  label?: string;
  value: Date | null;
  onChange: (value: Date, keyboardInputValue?: string | undefined) => void;
};

export const DatePicker: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <S.DesktopDate
      label={label}
      inputFormat="dd/MM/yyyy"
      value={value}
      onChange={(value, keyboardInputValue) =>
        onChange(value as Date, keyboardInputValue)
      }
      renderInput={(params: any) => <S.InputDate {...params} />}
      componentsProps={{
        actionBar: { actions: ["clear"] },
      }}
    />
  );
};
