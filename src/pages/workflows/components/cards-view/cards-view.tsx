import AddOutlined from '@mui/icons-material/AddOutlined'
import ExtensionOutlined from '@mui/icons-material/ExtensionOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'

import { TWorkflow } from 'models/workflow'

import { useWorkflowPage } from 'pages/workflows/hooks/useWorkflowPage'

import { getLongFormatByDate } from 'shared/utils/date'

import * as S from './styles'

type Props = {
  workflows: TWorkflow[]
}

export const CardsView: React.FC<Props> = ({ workflows }) => {
  const workflowPage = useWorkflowPage()

  const getActions = (workflow: TWorkflow) => {
    return [
      {
        icon: VisibilityOutlined,
        tooltip: 'Ver processos',
        onClick: () => workflowPage.navigateToProcess(workflow.workflow_id)
      },
      {
        icon: AddOutlined,
        tooltip: 'Novo processo',
        onClick: () => workflowPage.createProcess(workflow.name, workflow.workflow_id)
      },
      {
        icon: ExtensionOutlined,
        tooltip: 'Ver diagrama',
        onClick: () => workflowPage.navigateToDiagram(workflow.workflow_id)
      }
    ];
  }

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
          actions={getActions(workflow)}
        />
      ))}
    </>
  )
}