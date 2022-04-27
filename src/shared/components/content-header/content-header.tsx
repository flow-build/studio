import { useCallback, useState } from 'react';

import _debounce from 'lodash/debounce'

import { ModeView } from 'constants/mode-view';

import { TPayload } from 'shared/components/content-header/types/TPayload';

import * as S from './styles'

type TButtonProps = {
  hasButton?: boolean;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type TButtonModeView = {
  initialModeView?: ModeView;
  onChangeModeView?: (newModelView: ModeView) => void;
}

type TInput = {
  hasInput?: boolean;
  inputLabel?: string;
  onChangeInput?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

type Props = TButtonProps & TButtonModeView & TInput & {
  title: string;
  subtitle?: string;
}

export const ContentHeader: React.FC<Props> = ({
  title,
  subtitle,
  hasButton = true,
  onButtonClick = () => { },
  initialModeView = ModeView.LIST,
  onChangeModeView = () => { },
  hasInput = true,
  inputLabel = '',
  onChangeInput = () => { },
}) => {
  const [payload, setPayload] = useState<TPayload>({
    modeview: initialModeView
  })

  const onChangeToggle = useCallback((_, newModeView: ModeView) => {
    setPayload(prev => ({ ...prev, modeview: newModeView }));
    onChangeModeView(newModeView);
  }, [onChangeModeView])

  return (
    <S.Wrapper>
      <S.Row>
        <S.InfoContent>
          <S.Title>{title}</S.Title>
          {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
        </S.InfoContent>

        {hasButton && (
          <S.Button
            title='Novo'
            variant='outlined'
            onClick={onButtonClick}
          />
        )}
      </S.Row>

      <S.Row>
        {hasInput && (
          <S.Input
            id="outlined-required"
            label={inputLabel}
            onChange={_debounce(onChangeInput, 500)}
          />
        )}

        <S.ToggleContainer value={payload.modeview} onChange={onChangeToggle}>
          <S.Toggle value={ModeView.LIST} aria-label="Show in list mode">
            <S.ListIcon />
          </S.Toggle>

          <S.Toggle value={ModeView.CARDS} aria-label="Show in card mode">
            <S.ModuleIcon />
          </S.Toggle>
        </S.ToggleContainer>
      </S.Row>
    </S.Wrapper>
  )
}