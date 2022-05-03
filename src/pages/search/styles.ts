import styled from 'styled-components'

import Grid from '@mui/material/Grid'


export const Wrapper = styled(Grid).attrs({
  container: true,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
})`
  height: calc(100% - 64px);
`