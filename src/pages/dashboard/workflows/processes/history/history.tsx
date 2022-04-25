import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Table } from 'pages/dashboard/workflows/processes/history/components/table'

import { TState } from 'models/state'

import { getHistoryByProcessId } from 'services/resources/processes/history'

import * as S from './styles'

export const History: React.FC<{}> = () => {
  const { process_id } = useParams();

  const [history, setHistory] = useState<TState[]>([])

  useEffect(() => {
    const request = async () => {
      const response = await getHistoryByProcessId(process_id ?? '')
      setHistory(response.reverse())
    }

    request()
  }, [process_id])

  return (
    <S.Wrapper>
      <h1>History</h1>
      <Table data={history} />
    </S.Wrapper>
  )
}
