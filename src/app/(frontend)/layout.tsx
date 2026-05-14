import React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import './styles.css'

export const metadata = {
  description:
    'Synova Library is a collection of Beverage and Bakery recipes, as well as a collection of tools to help you manage your recipes and ingredients.',
  title: 'Synova Library',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <main>{children}</main>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
