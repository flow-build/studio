import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import _isEqual from 'lodash/isEqual'
import _isNull from 'lodash/isNull'

import { ModeView } from 'constants/mode-view'

import { CardsView } from 'pages/processes/components/cards-view'
import { Header } from 'pages/processes/components/header'
import { Table } from 'pages/processes/components/table'

import { TProcess } from 'models/process'
import { TWorkflow } from 'models/workflow'

import { listByProcessId } from 'services/resources/processes/list-by-process-id'
import { listWorkflowById } from 'services/resources/workflows/list-by-id'

import * as S from './styles'
import { Typography } from '@mui/material'

type TPayload = {
  processes: TProcess[] | null;
  workflow?: TWorkflow;
}

export const Processes: React.FC<{}> = () => {
  const { id } = useParams()

  const [modeView, setModeView] = useState(ModeView.LIST)
  const [payload, setPayload] = useState<TPayload>({ processes: null, workflow: undefined })

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

  if (_isNull(payload.processes)) {
    return <Typography>Loading...</Typography>;
  }

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
