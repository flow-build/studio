import { useState } from "react";
import * as S from "./styles";

type Props = {
  onClick?: () => void;
};

export const Form: React.FC<Props> = ({ onClick }) => {
  const [searchProcess, setSearchProcess] = useState({
    status: "",
    nodeId: "",
    initialDate: new Date(),
    finalDate: new Date(),
  });

  const onChangeProcesses = (
    value: string | Date,
    campo: "status" | "nodeId" | "initialDate" | "finalDate"
  ) => {
    setSearchProcess((prev: any) => ({ ...prev, [campo]: value }));
  };


  return (
    <S.Wrapper>
      <S.InputContainer>
        <S.InputProcess
          label="node id"
          value={searchProcess?.nodeId}
          onChange={(event) => {
            onChangeProcesses(event.target.value, "nodeId");
          }}
        >
          node_id
        </S.InputProcess>
        <S.InputProcess
          label="status"
          value={searchProcess?.status}
          onChange={(event) => {
            onChangeProcesses(event.target.value, "status");
          }}
        >
          status
        </S.InputProcess>
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
          />
          <S.DatePicker
            label="Data final"
            inputFormat="dd/MM/yyyy"
            value={searchProcess?.finalDate}
            onChange={(event) => {
              onChangeProcesses(event as Date, "finalDate");
            }}
            renderInput={(params: any) => <S.InputDate {...params} />}
          />
        </S.Provider>
        <S.SearchButton onClick={onClick} />
      </S.DateContainer>
    </S.Wrapper>
  );
};
