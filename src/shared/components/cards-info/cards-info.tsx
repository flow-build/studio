import _isEmpty from "lodash/isEmpty";

import { TAction } from "shared/components/cards-info/types/TAction";

import * as S from "./styles";

type Props = {
  title: string;
  subtitle: string;
  description?: string;
  headerTitle: string;
  footerTitle: string;
  actions?: TAction[];
};

export const CardsInfo: React.FC<Props> = ({
  title,
  subtitle,
  description,
  footerTitle,
  headerTitle,
  actions,
}) => {
  return (
    <S.Wrapper>
      <S.Card>
        <S.Content>
          <S.Subtitle>{headerTitle}</S.Subtitle>

          <S.Title>{title}</S.Title>
          <S.Subtitle>{subtitle}</S.Subtitle>

          {description && <S.Description>{description}</S.Description>}
        </S.Content>

        <S.Actions>
          <S.Caption>{footerTitle}</S.Caption>

          {!_isEmpty(actions) && (
            <div>
              {actions?.map((action, index) => (
                <S.IconButton
                  key={index.toString()}
                  icon={action.icon}
                  tooltip={action.tooltip}
                  onClick={action.onClick}
                  badge={action.badge}
                />
              ))}
            </div>
          )}
        </S.Actions>
      </S.Card>
    </S.Wrapper>
  );
};
