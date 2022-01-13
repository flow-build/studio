import React, { Suspense, useEffect } from 'react'
import { requestToken } from './services/loginService';

import GlobalStyle from './assets/styles/globalStyles';

import { Box, CircularProgress } from '@mui/material'
import { Layout } from './components'

function App() {

  useEffect(() => {
    requestToken()
  }, [])

  return (
    <React.Fragment>
      <GlobalStyle />
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
        <Layout />
      </Suspense>
    </React.Fragment>
  );
}

export default App;
