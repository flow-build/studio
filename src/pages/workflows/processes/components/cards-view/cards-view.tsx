import { TProcess } from 'models/process'

import { getLongFormatByDate } from 'shared/utils/date'


import * as S from './styles'

type Props = {
  processes: TProcess[]
}

export const CardsView: React.FC<Props> = ({ processes }) => {
  return (
    <>
      {processes.map(process => (
        <S.Cards
          key={process.id}
          title={process.state.node_name}
          subtitle={process.id}
          headerTitle={process.status}
          footerTitle={getLongFormatByDate(process.created_at)}
        />
      ))}
    </>
  )
}