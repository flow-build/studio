import { useEffect, useState } from 'react';

import { ColumnProps, WorkFlowProps } from 'interfaces/workflowPage';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getWorkflows } from 'services/workflows';
import { VisibilityIcon, AddIcon } from 'shared/icons';
import { Button, Table } from 'stories/components';
import * as S from 'styles/workflowPageStyles';

const column: ColumnProps[] = [
  { field: 'name', label: 'Name' },
  { field: 'workflow_id', label: 'ID' },
  { field: 'description', label: 'Description' },
  { field: 'version', label: 'Version' },
  { field: 'created_at', label: 'Created At' },
  { field: 'action', width: 170, align: 'center' }
];

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getWorkflows();
  const data = await res.data;

  return { props: { data } };
};

export default function Workflows({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [dataWorkflows, setDataWorkflows] = useState(data);

  useEffect(() => {
    setDataWorkflows(
      data.map((elem: WorkFlowProps) => ({
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
    );
  }, [data]);

  return (
    <S.Wrapper>
      <h3>Lista de Workflows</h3>
      <br />
      <Table column={column} rowData={dataWorkflows} paginable />
    </S.Wrapper>
  );
}
