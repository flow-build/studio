import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'

import _isEqual from 'lodash/isEqual'
import _isNull from 'lodash/isNull'

import { ModeView } from 'constants/mode-view'

import { CardsView } from 'pages/processes/components/cards-view'
import { useTable } from 'pages/processes/hooks/useTable'

import { TProcess } from 'models/process'
import { TWorkflow } from 'models/workflow'

import { listByProcessId } from 'services/resources/processes/list-by-process-id'
import { listWorkflowById } from 'services/resources/workflows/list-by-id'

import { ContentHeader } from 'shared/components/content-header'

import * as S from './styles'

type TPayload = {
  processes: TProcess[] | null;
  workflow: TWorkflow | null;
}

export const Processes: React.FC<{}> = () => {
  const { id } = useParams()

  const [modeView, setModeView] = useState(ModeView.LIST)
  const [payload, setPayload] = useState<TPayload>({ processes: null, workflow: null })

  const table = useTable(payload.processes ?? [])

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

  if (_isNull(payload.processes) || _isNull(payload.workflow)) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <S.Wrapper>
      <ContentHeader
        title={`Workflow - ${payload.workflow.name}`}
        subtitle={`Workflow id: ${payload.workflow.workflow_id}`}
        hasInput={false}
        hasButton={false}
        initialModeView={ModeView.LIST}
        onChangeModeView={setModeView}
      />

      {_isEqual(modeView, ModeView.CARDS) && <CardsView processes={payload.processes} />}

      {_isEqual(modeView, ModeView.LIST) && (
        <S.TableContainer>
          <S.Table columnData={table.columnData} rows={table.rows} />
        </S.TableContainer>
      )}
    </S.Wrapper>
  )
}
