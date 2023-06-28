import { Nodes } from 'features/nodes';
import { NodePageProps, ServerSideNodePageProps, Node } from 'features/nodes/types';
import { flowbuildApi } from 'services/flowbuildServer';

export const getServerSideProps: ServerSideNodePageProps = async ({ req }) => {
  flowbuildApi.setHeader({ Authorization: req.headers.authorization ?? '' });

  const url = `/cockpit/nodes`;
  const response = await flowbuildApi.get<Node>(url);

  return { props: { nodes: response.data } };
};

export default function NodesPage({ nodes }: NodePageProps) {
  return <Nodes categories={nodes.categories} types={nodes.types} />;
}
