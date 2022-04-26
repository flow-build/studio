import { TWorkflow } from 'models/workflow'

import { getLongFormatByDate } from 'shared/utils/date'

import * as S from './styles'

type Props = {
  workflows: TWorkflow[]
}

export const CardsView: React.FC<Props> = ({ workflows }) => {
  return (
    <>
      {workflows.map(workflow => (
        <S.Cards
          key={workflow.workflow_id}
          title={workflow.name}
          subtitle={workflow.workflow_id}
          description={workflow.description}
          headerTitle={`Versão ${workflow.version}`}
          footerTitle={getLongFormatByDate(workflow.created_at)}
        />
      ))}
    </>
  )
}