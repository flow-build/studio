import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import _isEqual from 'lodash/isEqual'

import { ModeView } from 'constants/mode-view';

import { CardsView } from 'pages/dashboard/workflows/components/cards-view'
import { Header } from 'pages/dashboard/workflows/components/header'
import { Table } from 'pages/dashboard/workflows/components/table'

import { TWorkflow } from 'models/workflow'

import { listWorkflows } from 'services/resources/workflows/list'

import { RootState } from 'store';

import * as S from './styles'

export const Workflows: React.FC<{}> = () => {
  const filter = useSelector((state: RootState) => state.filter)

  const [workflows, setWorkflows] = useState<TWorkflow[]>([]);
  const [modeView, setModeView] = useState(ModeView.LIST)

  const getAllWorkflows = useCallback(async () => {
    const response = await listWorkflows({ search: filter.value })
    setWorkflows(response.reverse())
  }, [filter.value])

  useEffect(() => {
    getAllWorkflows()
  }, [getAllWorkflows])

  return (
    <S.Wrapper>
      <Header initialModeView={modeView} onChange={setModeView} />

      {_isEqual(modeView, ModeView.CARDS) && <CardsView workflows={workflows} />}

      {_isEqual(modeView, ModeView.LIST) && (
        <S.TableContainer>
          <Table data={workflows} />
        </S.TableContainer>
      )}
    </S.Wrapper>
  )
}