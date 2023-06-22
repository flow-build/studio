import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { WorkFlow } from 'types/entities/workflow';

export type WorkflowsPageRowData = {
  createdAt: string;
  description: string;
  name: string;
  version: number;
  workflowId: string;
};

export type ServerSideWorkflowsPageProps = GetServerSideProps<{
  workflows: Array<WorkFlow>;
}>;

export type WorkflowsPageProps = InferGetServerSidePropsType<ServerSideWorkflowsPageProps>;
