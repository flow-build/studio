import { useState } from "react";
import * as S from "./styles";

interface IPayload {
  status?: string;
  nodeId?: string;
  initialDate: Date | null;
  finalDate: Date | null;
}

type Props = {
  onClick?: (payload: IPayload) => void;
};

export const Form: React.FC<Props> = ({ onClick }) => {
  const [searchProcess, setSearchProcess] = useState<IPayload>({
    status: "",
    nodeId: "",
    initialDate: null,
    finalDate: null,
  });

  const onChangeProcesses = (
    value: string | Date,
    campo: "status" | "nodeId" | "initialDate" | "finalDate"
  ) => {
    setSearchProcess((prev: any) => ({ ...prev, [campo]: value }));
  };

  function onSubmit() {
    if (onClick) {
      onClick(searchProcess);
    }
  }

  return (
    <S.Wrapper>
      <S.InputContainer>
        <S.InputProcess
          label="Node id"
          value={searchProcess?.nodeId}
          onChange={(event) => {
            onChangeProcesses(event.target.value, "nodeId");
          }}
        />

        <S.InputProcess
          label="Status"
          value={searchProcess?.status}
          onChange={(event) => {
            onChangeProcesses(event.target.value, "status");
          }}
        />
      </S.InputContainer>

      <S.DateContainer>
        <S.Provider>
          <S.DatePicker
            label="Data inicial"
            inputFormat="dd/MM/yyyy"
            value={searchProcess?.initialDate}
            onChange={(event) => {
              onChangeProcesses(event as Date, "initialDate");
            }}
            renderInput={(params: any) => <S.InputDate {...params} />}
            componentsProps={{
              actionBar: { actions: ["clear"] },
            }}
          />
          <S.DatePicker
            label="Data final"
            inputFormat="dd/MM/yyyy"
            value={searchProcess?.finalDate}
            onChange={(event) => {
              onChangeProcesses(event as Date, "finalDate");
            }}
            renderInput={(params: any) => <S.InputDate {...params} />}
            componentsProps={{
              actionBar: { actions: ["clear"] },
            }}
          />
        </S.Provider>

        <S.SearchButton onClick={onSubmit} />
      </S.DateContainer>
    </S.Wrapper>
  );
};
