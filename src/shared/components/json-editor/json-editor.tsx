import { IAceEditorProps } from "react-ace";
import { JSONSchema7 } from "json-schema";

import * as S from "./styles";

type Props = Pick<IAceEditorProps, "readOnly" | "onChange"> & {
  value?: { [key: string]: any } | JSONSchema7;
};

export const JsonEditor: React.FC<Props> = ({ readOnly, value, onChange }) => {
  return (
    <S.Wrapper
      readOnly={readOnly}
      value={JSON.stringify(value, null, "\t")}
      onChange={onChange}
    />
  );
};

