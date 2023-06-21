import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Process } from 'types/entities/process';

export type ProcessPageRowData = {
  id: string;
  nodeId: string;
  processId: string;
  version: number | null;
  status: string;
  createdAt: string;
  updatedAt: string | null;
};

export type ServerSideProcessesPageProps = GetServerSideProps<{
  processes: Array<Process>;
}>;

export type ProcessPageProps = InferGetServerSidePropsType<ServerSideProcessesPageProps>;
