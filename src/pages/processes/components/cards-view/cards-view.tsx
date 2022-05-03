import ExtensionOutlined from '@mui/icons-material/ExtensionOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'

import { TProcess } from 'models/process'

import { useProcessesPage } from 'pages/processes/hooks/useProcessesPage'

import { getLongFormatByDate } from 'shared/utils/date'


import * as S from './styles'

type Props = {
  processes: TProcess[]
}

export const CardsView: React.FC<Props> = ({ processes }) => {
  const processPage = useProcessesPage()

  const getActions = (process: TProcess) => {
    return [
      {
        icon: VisibilityOutlined,
        tooltip: 'Ver histórico',
        onClick: () => processPage.navigateToHistory(process.id)
      },
      {
        icon: ExtensionOutlined,
        tooltip: 'Ver diagrama',
        onClick: () => processPage.navigateToDiagram(process.id)
      },
    ];
  }

  return (
    <>
      {processes.map(process => (
        <S.Cards
          key={process.id}
          title={process.state.node_name}
          subtitle={process.id}
          headerTitle={process.status}
          footerTitle={getLongFormatByDate(process.created_at)}
          actions={getActions(process)}
        />
      ))}
    </>
  )
}