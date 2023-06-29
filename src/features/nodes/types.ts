import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export type NodeCategory = {
  category: string;
  nodes: number;
};

export type NodeType = {
  type: string;
  nodes: number;
};

export type Node = {
  categories: NodeCategory[];
  types: NodeType[];
};

export type ServerSideNodePageProps = GetServerSideProps<{
  nodes: Node;
}>;

export type NodePageProps = InferGetServerSidePropsType<ServerSideNodePageProps>;
