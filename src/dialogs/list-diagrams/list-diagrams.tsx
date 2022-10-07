import { TUser } from "models/user";

import { useSelector } from "react-redux";
import { RootState } from "store";

import { getShortFormatByDate } from "shared/utils/date";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onSelectDiagram?: (diagram: TUser) => void;
};

export const ListDiagrams: React.FC<Props> = ({
  isOpen,
  onClose,

  onSelectDiagram,
}) => {
  const data = useSelector(
    (state: RootState) => state.dialogPage.diagramInfoDialog.data
  );

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
          {data.length > 0 &&
            data?.map((diagram: any) => (
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
