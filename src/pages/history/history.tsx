import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'

import _isEqual from 'lodash/isEqual'
import _isNull from 'lodash/isNull'

import { ModeView } from 'constants/mode-view'

import { TState } from 'models/state'

import { useTable } from 'pages/history/hooks/useTable'

import { getHistoryByProcessId } from 'services/resources/processes/history'

import { ContentHeader } from 'shared/components/content-header'

import * as S from './styles'

export const History: React.FC<{}> = () => {
  const { process_id } = useParams();

  const [modeView, setModeView] = useState(ModeView.LIST)
  const [history, setHistory] = useState<TState[] | null>(null)

  const table = useTable(history ?? [])

  useEffect(() => {
    const request = async () => {
      const response = await getHistoryByProcessId(process_id ?? '')
      setHistory(response.reverse())
    }

    request()
  }, [process_id])

  if (_isNull(history)) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <S.Wrapper>
      <ContentHeader
        title='Histórico'
        subtitle={`Process id: ${process_id}`}
        hasInput={false}
        hasButton={false}
        initialModeView={ModeView.LIST}
        onChangeModeView={setModeView}
      />

      {_isEqual(modeView, ModeView.LIST) && (
        <S.TableContainer>
          <S.Table columnData={table.columnData} rows={table.rows} isCollapse />
        </S.TableContainer>
      )}
    </S.Wrapper>
  )
}
