import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import _isEqual from 'lodash/isEqual'

import { ModeView } from 'constants/mode-view'

import { CardsView } from 'pages/dashboard/workflows/processes/components/cards-view'
import { Header } from 'pages/dashboard/workflows/processes/components/header'
import { Table } from 'pages/dashboard/workflows/processes/components/table'

import { TProcess } from 'models/process'
import { TWorkflow } from 'models/workflow'

import { listByProcessId } from 'services/resources/processes/list-by-process-id'
import { listWorkflowById } from 'services/resources/workflows/list-by-id'

import * as S from './styles'

type TPayload = {
  processes: TProcess[];
  workflow?: TWorkflow;
}

export const Processes: React.FC<{}> = () => {
  const { id } = useParams()

  const [modeView, setModeView] = useState(ModeView.LIST)
  const [payload, setPayload] = useState<TPayload>({ processes: [], workflow: undefined })

  const getProcessesInformation = useCallback(async (workflowId: string) => {
    const response = await listByProcessId(workflowId)
    return response;
  }, [])

  const getWorkflowInformation = useCallback(async (workflowId: string) => {
    const response = await listWorkflowById(workflowId ?? '')
    return response;
  }, [])

  useEffect(() => {
    const request = async () => {
      const processes = await getProcessesInformation(id ?? '');
      const workflow = await getWorkflowInformation(id ?? '')

      setPayload({ processes, workflow })
    }

    request()
  }, [getProcessesInformation, getWorkflowInformation, id])

  return (
    <S.Wrapper>
      <Header
        title={payload.workflow?.name ?? ''}
        subtitle={payload.workflow?.workflow_id ?? ''}
        initialModeView={modeView}
        onChange={setModeView}
      />

      {_isEqual(modeView, ModeView.CARDS) && <CardsView processes={payload.processes} />}

      {_isEqual(modeView, ModeView.LIST) && (
        <S.TableContainer>
          <Table data={payload.processes} />
        </S.TableContainer>
      )}
    </S.Wrapper>
  )
}
