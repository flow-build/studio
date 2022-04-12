import { ExtensionOutlined, VisibilityOutlined } from '@mui/icons-material'

import { TProcess } from 'models/process'

import { IconButton } from 'shared/components/icon-button'
import { getLongFormatByDate } from 'shared/utils/date'


import * as S from './styles'

type Props = {
  processes: TProcess[]
}

export const CardsView: React.FC<Props> = ({ processes }) => {
  return (
    <>
      {processes.map(process => (
        <S.Wrapper key={process.workflow_id}>
          <S.Card>
            <S.Content>
              <S.Subtitle>{process.status}</S.Subtitle>

              <S.Title>{process.state.node_name}</S.Title>
              <S.Subtitle>{process.id}</S.Subtitle>
            </S.Content>

            <S.Actions>
              <S.Caption>{getLongFormatByDate(process.created_at)}</S.Caption>

              <div>
                <IconButton icon={VisibilityOutlined} tooltip="Ver processos" />
                <IconButton icon={ExtensionOutlined} tooltip="Ver diagrama" />
              </div>
            </S.Actions>
          </S.Card>
        </S.Wrapper>
      ))}
    </>
  )
}