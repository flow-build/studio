import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'

import _isNull from 'lodash/isNull'

import { TState } from 'models/state'

import { useTable } from 'pages/history/hooks/useTable'

import { getHistoryByProcessId } from 'services/resources/processes/history'

import { ContentHeader } from 'shared/components/content-header'

import * as S from './styles'

export const History: React.FC<{}> = () => {
  const { process_id } = useParams();

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
        showToggle={false}
      />

      <S.TableContainer>
        <S.Table columnData={table.columnData} rows={table.rows} isCollapse />
      </S.TableContainer>
    </S.Wrapper>
  )
}
