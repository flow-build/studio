import { Suspense } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack';

import { AppRoutes } from './routes'

import GlobalStyle from 'theme/global-style'

import { darkTheme } from 'theme/dark-theme'
// import { Alert } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />

      <Suspense fallback={<div></div>}>
        <SnackbarProvider maxSnack={3}>
          <AppRoutes />
        </SnackbarProvider>
      </Suspense>
    </ThemeProvider>
  );
}

/* content={(key, message) => (<Alert onClose={() => { }} severity='success' sx={{ width: '100%' }} >{message}</Alert>)} */

export default App;
