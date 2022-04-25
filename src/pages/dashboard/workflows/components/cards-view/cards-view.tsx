import { AddOutlined, ExtensionOutlined, VisibilityOutlined } from '@mui/icons-material'

import { TWorkflow } from 'models/workflow'

import { IconButton } from 'shared/components/icon-button'
import { getLongFormatByDate } from 'shared/utils/date'


import * as S from './styles'

type Props = {
  workflows: TWorkflow[]
}

export const CardsView: React.FC<Props> = ({ workflows }) => {
  return (
    <>
      {workflows.map(workflow => (
        <S.Wrapper key={workflow.workflow_id}>
          <S.Card>
            <S.Content>
              <S.Subtitle>Versão {workflow.version}</S.Subtitle>

              <S.Title>{workflow.name}</S.Title>
              <S.Subtitle>{workflow.workflow_id}</S.Subtitle>

              <S.Description>{workflow.description}</S.Description>
            </S.Content>

            <S.Actions>
              <S.Caption>{getLongFormatByDate(workflow.created_at)}</S.Caption>

              <div>
                <IconButton icon={VisibilityOutlined} tooltip="Ver processos" />
                <IconButton icon={AddOutlined} tooltip="Novo processos" />
                <IconButton icon={ExtensionOutlined} tooltip="Ver diagrama" />
              </div>
            </S.Actions>
          </S.Card>
        </S.Wrapper>
      ))}
    </>
  )
}