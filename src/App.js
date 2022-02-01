import React, { Suspense } from 'react'

import GlobalStyle from './assets/styles/globalStyles';

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material';

import Routes from 'routes/Routes'

import { Box, CircularProgress } from '@mui/material'

import { themeDefault } from 'config/themes'

const App = () => (
  <ThemeProvider theme={themeDefault}>
    <GlobalStyle />
    <CssBaseline />
    <Suspense fallback={
      <Box sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
      }} >
          <CircularProgress />
      </Box>
    }>
      <Routes />
    </Suspense>
  </ThemeProvider>
)

export default App;
