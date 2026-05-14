import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'

import config from '@/payload.config'
import HomePageClient from './HomePageClient'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <HomePageClient
      adminUrl={payloadConfig.routes.admin}
      user={user ? { email: user.email ?? '' } : null}
    />
  )
}
