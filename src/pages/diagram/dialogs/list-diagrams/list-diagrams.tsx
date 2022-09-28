import { useEffect, useState } from "react";

import { getShortFormatByDate } from "shared/utils/date";

import { TUser } from "models/user";
import { listById } from "services/resources/diagrams/list-by-id";

import * as S from "./styles";

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
