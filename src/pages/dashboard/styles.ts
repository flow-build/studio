import styled from 'styled-components'

import Box from '@mui/material/Box'

export const Wrapper = styled(Box).attrs({
  sx: {
    /* display: "grid",
    gridTemplateAreas: ` 
                'header header'
                'sidebar content'`,
    gridTemplateColumns: "80px calc(100vw - 80px)",
    gridTemplateRows: "64px calc(100vh - 64px)", */
    display: "flex",
    background: (theme) => theme.palette.background.default,
  }
})``

export const Frame = styled.div` 
  margin-top: 12px;
  width: 100%;
  height: 600px;
`;


/*  */