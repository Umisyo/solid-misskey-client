import { APIEvent, json } from 'solid-start'
import axios from 'axios'
import { getUserSession } from '~/routes/session.server'

export async function POST({ request }: APIEvent) {
  const session = await getUserSession(request)
  const instance = session.get('instance')
  const accessToken = session.get('token')

  const note = await new Response(request.body).json()
  console.log(accessToken)

  const res = await axios
    .post(`https://${instance}/api/notes/create`, {
      i: accessToken,
      visibility: 'public',
      text: note.text
    })
    .then(res => {
      res.data
    })
    .catch(err => {
      console.error('error:' + err)
    })

  return json(res)
}
