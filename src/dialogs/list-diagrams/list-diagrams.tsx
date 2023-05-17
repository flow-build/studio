import { TUser } from "models/user";

import { useSelector } from "react-redux";
import { RootState } from "store";

import { getShortFormatByDate } from "shared/utils/date";

import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { IDiagram } from "models/diagram/diagram";

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
  const navigate = useNavigate();

  const data = useSelector(
    (state: RootState) => state.dialogPage.diagramInfoDialog.data
  );

  const orderData: any[] = [];
  const dataNoDefault =
    data.filter((item: IDiagram) => item.isDefault !== true) ?? [];
  const dataDefault =
    data.find((item: IDiagram) => item.isDefault === true) ?? [];
  orderData.push(...dataDefault, ...dataNoDefault);

  function onClickListDiagram(diagram: TUser) {
    if (onClose) {
      onClose();
    }
    if (onSelectDiagram) {
      onSelectDiagram(diagram);
      navigate(
        `/dashboard/workflows/${diagram.workflow_id}/diagram/${diagram.id}`
      );
    }
  }

  function getSubtitle(diagram: IDiagram) {
    const createdAt = getShortFormatByDate(diagram.createdAt);
    const updatedAt = getShortFormatByDate(diagram.updatedAt);
    return `Criado em: ${createdAt} - Última atualização: ${updatedAt}`;
  }

  function getType(diagram: IDiagram) {
    return `Tipo de diagrama: ${diagram.type}`;
  }

  function checkIsDefault(diagram: IDiagram) {
    return `${diagram.name} ${diagram.isDefault ? `- Padrão` : new String()}`;
  }

  return (
    <S.ListDiagramsWrapper open={isOpen} onClose={onClose}>
      <S.ListTitle>
        Lista de diagramas
        <S.CloseListButton onClick={onClose} />
      </S.ListTitle>

      <S.Content dividers>
        <S.ListDiagram>
          {orderData.length > 0 &&
            orderData.map((diagram: any) => (
              <S.ItemDiagram disablePadding>
                <S.ItemButton onClick={() => onClickListDiagram(diagram)}>
                  <S.TextDiagram
                    key={diagram.id}
                    primary={checkIsDefault(diagram)}
                    secondary={
                      <>
                        <S.ItemText>{getType(diagram)}</S.ItemText>
                        <S.ItemText>{getSubtitle(diagram)}</S.ItemText>
                      </>
                    }
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
