import { useCallback } from 'react';

import { GridColDef, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid';
import { MiniCardsGridItem } from 'components/MiniCardsGrid/types';
import format from 'date-fns/format';
import { useRouter } from 'next/navigation';
import { VisibilityIcon, AccountTreeIcon } from 'shared/icons';
import { Button } from 'stories/components';
import { WorkFlow } from 'types/entities/workflow';
import { WorkflowsPageRowData } from 'types/pages/workflowsPage';

export function useWorkflowsPage(workflows: WorkFlow[]) {
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: 'workflowId', headerName: 'ID', minWidth: 200 },
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description', flex: 1, minWidth: 200 },
    { field: 'version', headerName: 'Version', headerAlign: 'center' },
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
      field: 'actions',
      headerName: 'Actions',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => (
        <div>
          <Button size="small" onClick={() => router.push(`/workflows/${params.id}/processes`)}>
            <VisibilityIcon fontSize="small" />
          </Button>
          <Button size="small">
            <AccountTreeIcon fontSize="small" />
          </Button>
        </div>
      )
    }
  ];

  const rowData = mapWorkflowsToRowData(workflows);

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

  function mapWorkflowsToRowData(workflows: WorkFlow[]): WorkflowsPageRowData[] {
    return workflows.map((workflow) => ({
      id: workflow.workflow_id,
      name: workflow.name,
      workflowId: workflow.workflow_id,
      description: workflow.description,
      version: workflow.version,
      createdAt: workflow.created_at,
      actions: null
    }));
  }

  const paginateCard = useCallback(
    (page = 1, itemsPerPage = 9): MiniCardsGridItem[] => {
      const pageIndex = page - 1;

      if (pageIndex < 0) {
        return [];
      }

      return workflows
        .slice(pageIndex * itemsPerPage, pageIndex * itemsPerPage + itemsPerPage)
        .map((workflow) => ({
          id: workflow.workflow_id,
          name: workflow.name,
          description: workflow.description,
          version: workflow.version
        }));
    },
    [workflows]
  );

  return { columns, rowData, paginateCard };
}
