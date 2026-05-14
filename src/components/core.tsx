'use client'

import { createTheme, ThemeProvider } from '@mui/material'
import { ComponentType } from 'react'

export namespace Core {
  export const connect =
    () =>
    <T extends object>(Comp: ComponentType<T>) => {
      return (props: T) => (
        <ThemeProvider
          theme={createTheme({
            palette: {
              mode: 'dark',
              primary: {
                main: '#e3a622',
              },
            },
          })}
        >
          <Comp {...props} />
        </ThemeProvider>
      )
    }
}
