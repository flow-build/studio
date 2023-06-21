import { GridColDef, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid';
import format from 'date-fns/format';
import { Process } from 'types/entities/process';
import { ProcessPageRowData } from 'types/pages/processesPage';

export function useProcessesPage(processes: Process[]) {
  const columns: GridColDef[] = [
    { field: 'nodeId', headerName: 'Node ID', align: 'left', flex: 1, minWidth: 200 },
    { field: 'processId', headerName: 'Process ID', align: 'left', flex: 1, minWidth: 320 },
    { field: 'version', headerName: 'Version', align: 'center', headerAlign: 'center', flex: 1 },
    { field: 'status', headerName: 'Status', align: 'center', headerAlign: 'center', flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      valueGetter: setDateColumnValue,
      valueFormatter: formatDateColumn
    },
    {
      field: 'updatedAt',
      headerName: 'Last Update',
      align: 'center',
      headerAlign: 'center',
      flex: 1
    },
    { field: 'actions', headerName: 'Actions', align: 'center', headerAlign: 'center', flex: 1 }
  ];

  const rowData = mapProcessesToRowData(processes);

  function setDateColumnValue(params: GridValueGetterParams) {
    return new Date(params.value).getTime();
  }

  function formatDateColumn(params: GridValueFormatterParams<string>) {
    if (!params.value) {
      return '';
    }

    const date = new Date(params.value);
    return format(date, 'MM-dd-yyyy');
  }

  function mapProcessesToRowData(processes: Process[]): ProcessPageRowData[] {
    return processes.map((process) => ({
      id: process.id,
      nodeId: process.state.node_name,
      processId: process.id,
      version: null,
      status: process.status,
      createdAt: process.created_at,
      updatedAt: null
    }));
  }

  return { columns, rowData };
}
