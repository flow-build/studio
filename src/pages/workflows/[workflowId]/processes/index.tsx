import { useState } from 'react';

import { BaseGrid } from 'components/BaseGrid';
import { MiniCardsGridItem } from 'components/MiniCardsGrid/types';
import { useProcessesPage } from 'hooks/pages/processes';
import { flowbuildApi } from 'services/flowbuildServer';
import { ModeView } from 'shared/enum';
import { Process } from 'types/entities/process';
import { ProcessPageProps, ServerSideProcessesPageProps } from 'types/pages/processesPage';

export const getServerSideProps: ServerSideProcessesPageProps = async ({ req, params }) => {
  flowbuildApi.setHeader({ Authorization: req.headers.authorization ?? '' });

  const url = `/workflows/${params?.workflowId}/processes`;
  const response = await flowbuildApi.get<Process[]>(url);

  return { props: { processes: response.data } };
};

export default function Process({ processes }: ProcessPageProps) {
  const { columns, rowData, paginateCard } = useProcessesPage(processes);
  const [cards, setCards] = useState<MiniCardsGridItem[]>([]);

  function onChangePage(page: number) {
    const paginatedCards = paginateCard(page);
    setCards(paginatedCards);
  }

  function onChangeModeView(modeView: ModeView) {
    const isCardModeView = modeView === ModeView.CARDS;

    if (!isCardModeView) {
      setCards([]);
      return;
    }

    const paginatedCards = paginateCard(1);
    setCards(paginatedCards);
  }

  return (
    <BaseGrid
      breadcrumb={[{ text: 'Workflows', redirectLink: '/workflows' }, { text: 'Processes' }]}
      cards={{ items: cards, onChangePage }}
      table={{ columns, rowData }}
      onChangeModeView={onChangeModeView}
    />
  );
}
