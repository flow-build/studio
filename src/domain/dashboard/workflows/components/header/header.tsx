import { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import _debounce from 'lodash/debounce'

import { ModeView } from 'constants/mode-view';

import { Button } from 'shared/components/button'

import { updateFilter } from 'store/slices/filter';

import * as S from './styles'

type TPayload = {
  modeview: ModeView
}

type Props = {
  initialModeView?: ModeView,
  onChange: (newModelView: ModeView) => void
}

export const Header: React.FC<Props> = ({ initialModeView = ModeView.LIST, onChange }) => {
  const dispatch = useDispatch()

  const [payload, setPayload] = useState<TPayload>({
    modeview: initialModeView
  })

  const onChangeModeView = useCallback((_, newModeView: ModeView) => {
    setPayload(prev => ({ ...prev, modeview: newModeView }))
    onChange(newModeView)
  }, [onChange])

  const onChangeFilter = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(updateFilter(event.target.value))
  }, [dispatch])

  return (
    <S.Wrapper>
      <S.Row>
        <S.Title>Workflows</S.Title>
        <Button title='Novo' variant='outlined' />
      </S.Row>
      <S.Row>
        <S.Input
          id="outlined-required"
          label="Nome / ID"
          onChange={_debounce(onChangeFilter, 500)}
        />

        <S.ToggleContainer value={payload.modeview} onChange={onChangeModeView}>
          <S.Toggle value={ModeView.LIST} aria-label="Show in list mode">
            <S.ListIcon />
          </S.Toggle>

          <S.Toggle value={ModeView.CARDS} aria-label="Show in card mode">
            <S.ModuleIcon />
          </S.Toggle>
        </S.ToggleContainer>
      </S.Row>
    </S.Wrapper>
  );
}