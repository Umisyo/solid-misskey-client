import { APIEvent } from 'solid-start'
import { json, redirect } from 'solid-start/server'
import axios from 'axios'
import { getUserSession } from '~/routes/session.server'

export async function GET({ request }: APIEvent) {
  const session = await getUserSession(request)
  const instance = session.get('instance')
  const accessToken = session.get('token')
  const channel = new URL(request.url).searchParams.get('channel')
  const notes = await axios
    .post(`https://${instance}/api/notes/${channel}`, {
      i: accessToken,
      limit: 100
    })
    .then(res => {
      return res.data
    })
    .catch(() => {
      throw redirect('/login')
    })

  return json({ notes })
}
