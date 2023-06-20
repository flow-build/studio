import { TableCellProps } from '@mui/material';

export type ColumnProps = {
  field: string;
  label?: string;
  align?: TableCellProps['align'];
  width?: number;
};

export interface Props {
  createdAt: string;
  description: string;
  name: string;
  version: number;
  workflowId: string;
}
