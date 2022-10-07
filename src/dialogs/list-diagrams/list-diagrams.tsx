import { useEffect, useState, useCallback } from "react";

import { TUser } from "models/user";
import { listByWorkflow } from "services/resources/diagrams/list-by-workflow";

import { getShortFormatByDate } from "shared/utils/date";
import _isEmpty from "lodash/isEmpty";

import * as S from "./styles";
import { setDiagramSelected } from "store/slices/dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  // id: string;
  onSelectDiagram?: (diagram: TUser) => void;
};

export const ListDiagrams: React.FC<Props> = ({
  isOpen,
  onClose,
  // id,
  onSelectDiagram,
}) => {
  //const [listDiagram, setListDiagram] = useState<TUser[]>([]);
  // console.log(listDiagram, "listDiagram");

  const dispatch = useDispatch();

  const data:TUser[] = useSelector(
    (state: RootState) => state.dialogPage.diagramInfoDialog.data
  );
  console.log(data, "data");

  // function getResponse() {
  //   const response = data;
  //   return response;
  // }

  // useEffect(() => {
  //   if (isOpen) {
  //   }
  // });

  function onClickListDiagram(diagram: TUser) {
    if (onClose) {
      onClose();
    }
    if (onSelectDiagram) {
      onSelectDiagram(diagram);
    }
  }

  function getSubtitle(diagram: TUser) {
    const createdAt = getShortFormatByDate(diagram.created_at);
    const updatedAt = getShortFormatByDate(diagram.updated_at);
    return `criado em: ${createdAt} - atualizado em: ${updatedAt}`;
  }

  return (
    <S.ListDiagramsWrapper open={isOpen} onClose={onClose}>
      <S.ListTitle>
        Lista de diagramas
        <S.CloseListButton onClick={onClose} />
      </S.ListTitle>

      <S.Content dividers>
        <S.ListDiagram>
          {data.map((diagram: any) => (
            <S.ItemDiagram disablePadding>
              <S.ItemButton onClick={() => onClickListDiagram(diagram)}>
                <S.TextDiagram
                  key={diagram.id}
                  primary={diagram.name}
                  secondary={getSubtitle(diagram)}
                />
                <S.RightArrowList />
              </S.ItemButton>
            </S.ItemDiagram>
          ))}
        </S.ListDiagram>
      </S.Content>
    </S.ListDiagramsWrapper>
  );
};
