import { APIEvent } from 'solid-start'

export async function GET({ params }: APIEvent) {
  return new Response(null, {
    status: 200,
    headers: {
      Location: `https://${params.instance}/miauth/${
        params.sessionID
      }?callback=${import.meta.env.VITE_APP_URL}/api/miauth/${
        params.instance
      }/${params.sessionID}/callback&permission=write:notes`
    }
  })
}
