import axios from 'axios'
import { APIEvent } from 'solid-start'
import { createUserSession } from '~/routes/session.server'

export async function GET({ params }: APIEvent) {
  const checkUrl = `https://${params.instance}/api/miauth/${params.sessionID}/check`
  const response = (await axios.post(checkUrl, {})).data

  return createUserSession(
    params.instance,
    response.ok,
    response.token,
    response.user.username,
    response.user.avatarUrl,
    import.meta.env.VITE_APP_URL
  )
}
