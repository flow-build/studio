import { useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { ContentHeader } from 'components/ContentHeader';
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

  const isTableModeView = modeView === ModeView.TABLE;
  const isCardModeView = modeView === ModeView.CARDS;

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

      {isCardModeView && <h1>card</h1>}
    </>
  );
}
