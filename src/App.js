import React, { useEffect } from 'react'

import { ThemeProvider } from 'styled-components'
import { requestToken } from './services/loginService'
import GlobalStyles from './assets/styles/globalStyles'
import themeDefault from './assets/styles/themeDefault'

import GridLayout from './components/GridLayout'
import Sidebar from './components/Sidebar'

const App = () => {

  useEffect(() => {
    requestToken()
  }, [])

  return (
    <ThemeProvider theme={themeDefault}>
      <GlobalStyles/>

      <GridLayout>
        <Sidebar/>

      </GridLayout>
    </ThemeProvider>
  );
}

export default App;
