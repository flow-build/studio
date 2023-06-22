import { useEffect, useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { ContentHeader } from 'components/ContentHeader';
import { MiniCardsGrid } from 'components/MiniCardsGrid';
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

export default function Process({ workflows }: WorkflowsPageProps) {
  const { columns, rowData, paginateCard } = useWorkflowsPage(workflows);
  const [modeView, setModeView] = useState<ModeView>(ModeView.TABLE);
  const [cards, setCards] = useState<MiniCardsGridItem[]>([]);
  const totalPage = Math.ceil(workflows.length / 9);

  const isTableModeView = modeView === ModeView.TABLE;
  const isCardModeView = modeView === ModeView.CARDS;

  function onChangePage(page: number) {
    const paginatedCards = paginateCard(page);
    setCards(paginatedCards);
  }

  useEffect(() => {
    if (!isCardModeView) {
      setCards([]);
      return;
    }

    const paginatedCards = paginateCard(1);
    setCards(paginatedCards);
  }, [isCardModeView, paginateCard]);

  return (
    <>
      <ContentHeader
        items={[{ text: 'Workflows', redirectLink: '/workflows' }, { text: 'Processes' }]}
        onChangeModeView={setModeView}
      />

      <br />

      {isTableModeView && (
        <DataGrid
          rows={rowData}
          columns={columns}
          disableColumnMenu
          disableRowSelectionOnClick
          autoPageSize
        />
      )}

      {isCardModeView && (
        <MiniCardsGrid items={cards} totalPage={totalPage} onChangePage={onChangePage} />
      )}
    </>
  );
}
