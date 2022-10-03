import { useEffect, useState, useCallback } from "react";

import { TUser } from "models/user";
import { listById } from "services/resources/diagrams/list-by-id";

import { getShortFormatByDate } from "shared/utils/date";

import * as S from "./styles";
import { useParams } from "react-router-dom";

import _isEmpty from "lodash/isEmpty";
import { useSelector } from "react-redux";
import { RootState } from "store";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  id: string;
  onSelectDiagram?: (diagram: TUser) => void;
};

export const ListDiagrams: React.FC<Props> = ({
  isOpen,
  onClose,
  id,
  onSelectDiagram,
}) => {
  const data = useSelector(
    (state: RootState) => state.dialogPage.diagramInfoDialog.data
  );
  console.log(data);
  const [listDiagram, setListDiagram] = useState<TUser[]>([]);

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

  const getDiagrams = useCallback(async () => {
    const response = await listById(id);

    const result = response.filter((diagram: any) => {
      return diagram.workflow_id.includes(data);
    });

    console.log(result, "result");

    console.log(response, "filterDiagram");

    setListDiagram(result);
  }, [id, data]);

  useEffect(() => {
    if (isOpen) {
      getDiagrams();
    }
  }, [isOpen, getDiagrams]);

  return (
    <S.ListDiagramsWrapper open={isOpen} onClose={onClose}>
      <S.ListTitle>
        Lista de diagramas
        <S.CloseListButton onClick={onClose} />
      </S.ListTitle>

      <S.Content dividers>
        <S.ListDiagram>
          {listDiagram.map((diagram) => (
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
