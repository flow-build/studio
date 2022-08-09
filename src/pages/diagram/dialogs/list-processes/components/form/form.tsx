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

  function cleanFilter() {
    setSearchProcess({
      status: "",
      nodeId: "",
      initialDate: null,
      finalDate: null,
    });
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

        <S.Provider>
          <S.DatePickerInput
            label="Data inicial"
            value={searchProcess?.initialDate}
            onChange={(event) => {
              onChangeProcesses(event as Date, "initialDate");
            }}
          />

          <S.DatePickerInput
            label="Data final"
            value={searchProcess?.finalDate}
            onChange={(event) => {
              onChangeProcesses(event as Date, "finalDate");
            }}
          />
        </S.Provider>
      </S.InputContainer>
      <S.Buttons>
        <S.ClearButton onClick={cleanFilter} process={process} />
        <S.SearchButton onClick={onSubmit} />
      </S.Buttons>
    </S.Wrapper>
  );
};
