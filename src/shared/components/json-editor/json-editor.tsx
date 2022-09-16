import { IAceEditorProps } from "react-ace";

import * as S from "./styles";

type Props = Pick<IAceEditorProps, "readOnly" | "value" | "onChange">;

export const JsonEditor: React.FC<Props> = ({ readOnly, value, onChange }) => {
  return (
    <S.Wrapper
      readOnly={readOnly}
      // value={JSON.stringify(value, null, "\t")}
      onChange={onChange}
    />
  );
};

