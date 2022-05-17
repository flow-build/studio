import styled from 'styled-components'

import MuiCollapse from '@mui/material/Collapse'
import MuiTableCell from '@mui/material/TableCell'
import MuiTableRow from '@mui/material/TableRow'

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'

import { IconButton as SharedIconButton } from 'shared/components/icon-button'

export const TableRow = styled(MuiTableRow)``

export const TableCell = styled(MuiTableCell)``

export const Collapse = styled(MuiCollapse).attrs({
  in: true,
  timeout: 'auto',
  component: "div"
})``

export const IconButton = styled(SharedIconButton)``

export const ArrowUpIcon = styled(KeyboardArrowUp)``

export const ArrowDownIcon = styled(KeyboardArrowDown)``