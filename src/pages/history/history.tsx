import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Table } from 'pages/history/components/table'

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
      <S.Title>History</S.Title>
      <Table data={history} />
    </S.Wrapper>
  )
}
