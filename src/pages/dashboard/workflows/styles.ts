import styled from 'styled-components'

import Grid from '@mui/material/Grid'

import { Table as SharedTable } from 'shared/components/table'

export const Wrapper = styled(Grid).attrs({
  container: true,
  spacing: 2

})``

export const TableContainer = styled(Grid).attrs({
  item: true,
  xs: 12
})``

export const Table = styled(SharedTable)``
