import { DataGrid } from '@mui/x-data-grid';
import { useProcessesPage } from 'hooks/pages/processes';
import flowbuildApi from 'services/flowbuildServer';
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

  return (
    <>
      <h1>Processo</h1>
      <br />
      <DataGrid
        rows={rowData}
        columns={columns}
        disableColumnMenu
        disableRowSelectionOnClick
        autoPageSize
      />
    </>
  );
}
