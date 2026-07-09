'use client'

import { createTheme, ThemeProvider } from '@mui/material'
import { ComponentType } from 'react'

export namespace Core {
  export const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#e3a622',
      },
    },
    typography: {
      fontFamily: '"Kanit", sans-serif',
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: 'inherit',
          },
        },
      },
    },
  })

  export const connect =
    () =>
    <T extends object>(Comp: ComponentType<T>) =>
    (props: T) => (
      <ThemeProvider theme={theme}>
        <Comp {...props} />
      </ThemeProvider>
    )
}
