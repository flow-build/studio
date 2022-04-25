import styled from 'styled-components'

import Box from '@mui/material/Box'

export const Wrapper = styled(Box).attrs({
  sx: {
    display: "grid",
    gridTemplateAreas: ` 
                'header header'
                'sidebar content'`,
    gridTemplateColumns: "280px calc(100vw - 280px)",
    gridTemplateRows: "64px calc(100vh - 64px)",
    background: (theme) => theme.palette.background.default,
  }
})``