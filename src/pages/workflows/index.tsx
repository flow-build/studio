import { useState } from 'react';

import { BaseGrid } from 'components/BaseGrid';
import { MiniCardsGridItem } from 'components/MiniCardsGrid/types';
import { useWorkflowsPage } from 'hooks/pages/workflows';
import { flowbuildApi } from 'services/flowbuildServer';
import { ModeView } from 'shared/enum';
import { WorkFlow } from 'types/entities/workflow';
import { WorkflowsPageProps, ServerSideWorkflowsPageProps } from 'types/pages/workflowsPage';

export const getServerSideProps: ServerSideWorkflowsPageProps = async ({ req }) => {
  flowbuildApi.setHeader({ Authorization: req.headers.authorization ?? '' });

  const url = `/workflows`;
  const response = await flowbuildApi.get<WorkFlow[]>(url);

  return { props: { workflows: response.data } };
};

export default function WorkflowsPage({ workflows }: WorkflowsPageProps) {
  const { columns, rowData, paginateCard } = useWorkflowsPage(workflows);
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
      breadcrumb={[{ text: 'Workflows' }]}
      cards={{ items: cards, onChangePage }}
      table={{ columns, rowData }}
      onChangeModeView={onChangeModeView}
    />
  );
}
