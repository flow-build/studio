import { useState } from "react";
import { IFilter } from "pages/diagram/dialogs/list-processes/types/IFilter";
import * as S from "./styles";


type Props = {
  onClick?: (payload: IFilter) => void;
};

export const Form: React.FC<Props> = ({ onClick }) => {
  const [searchProcess, setSearchProcess] = useState<IFilter>({
    status: "",
    nodeId: "",
    initialDate: null,
    finalDate: null,
  });

  const onChangeProcesses = (
    value: string | Date,
    campo: keyof IFilter,
  ) => {
    setSearchProcess((prev: any) => ({ ...prev, [campo]: value }));
  };

  function onSubmit() {
    if (onClick) {
      onClick(searchProcess);
    }
  }

  function cleanFilter() {
    const filter = {
      status: "",
      nodeId: "",
      initialDate: null,
      finalDate: null,
    };
    setSearchProcess(filter);
    if (onClick) {
      onClick(filter);
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
        <S.ClearButton onClick={cleanFilter} />
        <S.SearchButton onClick={onSubmit} />
      </S.Buttons>
    </S.Wrapper>
  );
};
