import styled from 'styled-components'

import Grid from '@mui/material/Grid'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { ViewList, ViewModule } from '@mui/icons-material'

import { Button as SharedButton } from 'shared/components/button'

export const Wrapper = styled(Grid).attrs({
  item: true,
  xs: 12
})``

export const Row = styled(Grid).attrs({
  item: true,
  xs: 12
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Title = styled(Typography).attrs({
  variant: 'h4',
  component: 'h4',
  gutterBottom: true
})``;

export const Button = styled(SharedButton)``;

export const Input = styled(TextField).attrs({
  size: 'small'
})``

export const ToggleContainer = styled(ToggleButtonGroup).attrs({
  exclusive: true
})`
  margin-left: auto;
`

export const Toggle = styled(ToggleButton).attrs({})``

export const ListIcon = styled(ViewList).attrs({})``

export const ModuleIcon = styled(ViewModule).attrs({})``