import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'

import config from '@/payload.config'
import { PreCon } from './pre.con'

import '../styles.css'

const LayoutRecipes = async ({ children }: { children: React.ReactNode }) => {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect(`${payloadConfig.serverURL}/admin/login?redirect=${encodeURIComponent('/')}`)
  }

  return <PreCon children={children} user={user} />
}

export default LayoutRecipes
