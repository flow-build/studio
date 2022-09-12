import { Suspense, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

import { AppRoutes } from "./routes";

import GlobalStyle from "theme/global-style";

import { darkTheme } from "theme/dark-theme";

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

export default App;
