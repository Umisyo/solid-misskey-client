import { APIEvent, json } from 'solid-start'
import { getUserSession } from '~/routes/session.server'

export async function GET({ request }: APIEvent) {
  const session = await getUserSession(request)
  const instance = await session.get('instance')

  return json({ instance })
}
