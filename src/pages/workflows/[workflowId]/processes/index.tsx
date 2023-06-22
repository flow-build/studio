import { useEffect, useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { ContentHeader } from 'components/ContentHeader';
import { MiniCardsGrid } from 'components/MiniCardsGrid';
import format from 'date-fns/format';
import { useProcessesPage } from 'hooks/pages/processes';
import flowbuildApi from 'services/flowbuildServer';
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
  const { columns, rowData } = useProcessesPage(processes);
  const [modeView, setModeView] = useState<ModeView>(ModeView.TABLE);
  const [cards, setCards] = useState<any[]>([]);
  const totalPage = Math.ceil(processes.length / 9);

  const isTableModeView = modeView === ModeView.TABLE;
  const isCardModeView = modeView === ModeView.CARDS;

  function onChangePage(page: number) {
    const slicedProcesses = processes.slice((page - 1) * 9, (page - 1) * 9 + 9).map((process) => ({
      name: process.state.node_name,
      description: process.id,
      text: `${process.status} | ${format(new Date(process.created_at), 'dd-MM-yyyy')}`
    }));

    setCards(slicedProcesses);
  }

  useEffect(() => {
    if (!isCardModeView) {
      setCards([]);
      return;
    }

    const slicedProcesses = processes.slice(0, 9).map((process) => ({
      name: process.state.node_name,
      description: process.id,
      text: `${process.status} | ${format(new Date(process.created_at), 'dd-MM-yyyy')}`
    }));

    setCards(slicedProcesses);
  }, [isCardModeView, processes]);

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
