import styled from 'styled-components'

import MuiTable from '@mui/material/Table'
import MuiTableBody from '@mui/material/TableBody'
import MuiTableCell from '@mui/material/TableCell'
import MuiTableHead from '@mui/material/TableHead'
import MuiTableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'

import { CollapseTableBody } from 'shared/components/table/components/collapse-table-body'

export const Wrapper = styled(TableContainer).attrs({
  component: Paper
})``

export const Table = styled(MuiTable)``

export const TableCell = styled(MuiTableCell)``

export const TableBody = styled(MuiTableBody)``

export const TableHead = styled(MuiTableHead)``

export const TableRow = styled(MuiTableRow)``

export const TableBodyContent = styled(CollapseTableBody)``