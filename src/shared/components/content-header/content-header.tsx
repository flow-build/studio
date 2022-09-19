import { useNavigate } from "react-router-dom";

import _debounce from "lodash/debounce";

import { ModeView } from "constants/mode-view";

import { BreadcrumbsNavigation } from "shared/components/breadcrumbs";
import { TButtonModeView } from "shared/components/content-header/components/toggle-container/types/TButtonModeView"
import { ToggleContainer } from "shared/components/content-header/components/toggle-container";

import * as S from "./styles";

type TButtonProps = {
  onClick?: () => void;
  title: string;
  disabled?: boolean;
  variant?: "text" | "outlined" | "contained";
};

type TInput = {
  hasInput?: boolean;
  inputLabel?: string;
  onChangeInput?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};

type Props = TButtonModeView &
  TInput & {
    title: string;
    subtitle?: string;
    showToggle?: boolean;
    hasBackButton?: boolean;
    buttons?: TButtonProps[];
  };

export const ContentHeader: React.FC<Props> = ({
  title,
  subtitle,
  initialModeView = ModeView.LIST,
  onChangeModeView = () => {},
  hasInput = true,
  hasBackButton = false,
  inputLabel = "",
  onChangeInput = () => {},
  showToggle = true,
  buttons = [],
}) => {

  const navigate = useNavigate();
  const GO_BACK = -1;

  return (
    <S.Wrapper>
      <BreadcrumbsNavigation />
        {hasBackButton && <S.BackButton onClick={() => navigate(GO_BACK)} />}
      <S.Row>
        <S.InfoContent>
          <S.Title>{title}</S.Title>
          {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
        </S.InfoContent>
        <S.RowButtons>
          {buttons.map((button) => (
            <S.Button
              title={button.title}
              variant={button.variant}
              onClick={button.onClick}
              disabled={button.disabled}
            />
          ))}
        </S.RowButtons>
      </S.Row>
      <S.Row>
        {hasInput && (
          <S.Input
            id="outlined-required"
            label={inputLabel}
            onChange={_debounce(onChangeInput, 500)}
          />
        )}
        <ToggleContainer showToggle={showToggle} initialModeView={initialModeView} onChangeModeView={onChangeModeView} />
      </S.Row>
    </S.Wrapper>
  );
};
