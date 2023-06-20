import { useEffect, useState } from 'react';

import { ColumnProps, WorkFlowProps } from 'interfaces';
import { getWorkflows } from 'services/workflows';
import { VisibilityIcon, AddIcon } from 'shared/icons';
import { Button, Table } from 'stories/components';
import * as S from 'styles/workflowPageStyles';
import { Logger } from 'utils';

const column: ColumnProps[] = [
  { field: 'name', label: 'Name' },
  { field: 'workflow_id', label: 'ID' },
  { field: 'description', label: 'Description' },
  { field: 'version', label: 'Version' },
  { field: 'created_at', label: 'Created At' },
  { field: 'action', width: 170, align: 'center' }
];

export default function Workflows() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getWorkflows().then((res) =>
      setData(
        res.data.map((elem: WorkFlowProps) => ({
          ...elem,
          action: (
            <div>
              <Button onClick={() => console.log(elem.name)}>
                <VisibilityIcon />
              </Button>
              <Button onClick={() => console.log(elem.name)}>
                <AddIcon />
              </Button>
            </div>
          )
        }))
      )
    );
  }, []);

  return (
    <>
      <S.Wrapper>
        <h3>Lista de Workflows</h3>
        <br />
        <Table column={column} rowData={data} onRowClick={Logger.info} paginable />
      </S.Wrapper>
    </>
  );
}
