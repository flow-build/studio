import { TableCellProps } from '@mui/material';

export type ColumnProps = {
  field: string;
  label?: string;
  align?: TableCellProps['align'];
  width?: number;
};

export interface WorkFlowProps {
  created_at: string;
  description: string;
  name: string;
  version: number;
  workflow_id: string;
}
