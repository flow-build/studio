import { useEffect, useState } from "react";

import { getLongFormatByDate } from "shared/utils/date";

import { TUser } from "models/user";
import { listById } from "services/resources/diagrams/list-by-id";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  id: string;
  onSelectItem?: (diagram: TUser) => void;
};

export const ListDiagrams: React.FC<Props> = ({
  isOpen,
  onClose,
  id,
  onSelectItem,
}) => {
  const [listDiagram, setListDiagram] = useState<TUser[]>([]);

  function onClickListDiagram(diagram: TUser) {
    if (onClose) {
      onClose();
    }
    if (onSelectItem) {
      onSelectItem(diagram);
    }
  }

  function getSubtitle(diagram: TUser) {
    const createdAt = getLongFormatByDate(diagram.created_at);
    const updatedAt = getLongFormatByDate(diagram.updated_at);
    return `criado em: ${createdAt} - atualizado em: ${updatedAt}`;
  }

  useEffect(() => {
    const request = async () => {
      const response = await listById(id);
      console.log(response, "diagrams");

      setListDiagram(response);
    };
    if (isOpen) {
      request();
    }
  }, [isOpen, id]);

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
