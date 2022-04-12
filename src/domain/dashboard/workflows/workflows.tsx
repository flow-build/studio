import { useEffect, useState } from 'react'

import _isEqual from 'lodash/isEqual'

import { ModeView } from 'constants/mode-view';

import { CardsView } from 'domain/dashboard/workflows/components/cards-view'
import { Header } from 'domain/dashboard/workflows/components/header'
import { Table } from 'domain/dashboard/workflows/components/table'

import { TWorkflow } from 'models/workflow'

import { listWorkflows } from 'services/resources/workflows/list'

import * as S from './styles'

export const Workflows: React.FC<{}> = () => {
  const [workflows, setWorkflows] = useState<TWorkflow[]>([]);
  const [modeView, setModeView] = useState(ModeView.LIST)

  useEffect(() => {
    const request = async () => {
      const response = await listWorkflows()
      setWorkflows(response.reverse())
    }
    request()
  }, [])

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