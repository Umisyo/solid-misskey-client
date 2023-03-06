import { APIEvent } from 'solid-start'
import { logout } from '~/routes/session.server'

export async function POST({ request }: APIEvent) {
  return await logout(request)
}
