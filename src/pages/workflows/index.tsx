import { ColumnProps, WorkFlowProps } from 'interfaces/workflowPage';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/navigation';
import flowbuildApi from 'services/flowbuildServer';
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  flowbuildApi.setHeader({ Authorization: req.headers.authorization ?? '' });
  const res = await flowbuildApi.get('/workflows');
  const data = res.data;

  return { props: { data } };
};

export default function Workflows({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const list = getList();

  function getList() {
    return data.map((elem: WorkFlowProps) => ({
      ...elem,
      action: (
        <div>
          <Button onClick={() => router.push(`/workflows/${elem.workflow_id}/processes`)}>
            <VisibilityIcon />
          </Button>
          <Button onClick={() => console.log(elem.name)}>
            <AddIcon />
          </Button>
        </div>
      )
    }));
  }

  return (
    <S.Wrapper>
      <h3>Lista de Workflows</h3>
      <br />
      <Table column={column} rowData={list} paginable />
    </S.Wrapper>
  );
}
