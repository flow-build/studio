import { Suspense } from 'react'
import { ThemeProvider } from '@mui/material/styles'

import { AppRoutes } from './routes'

import GlobalStyle from 'theme/global-style'

import { darkTheme } from 'theme/dark-theme'


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Suspense fallback={<div></div>}>
        <AppRoutes />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
