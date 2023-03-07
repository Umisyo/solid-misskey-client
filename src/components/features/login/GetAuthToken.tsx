import axios from 'axios'
import { createEffect } from 'solid-js'

export interface GetAuthTokenProps {
  instance: string
  sessionID: string
}

export default function GetAuthToken(props: GetAuthTokenProps) {
  const fetchToken = async () => {
    const checkUrl = `/api/miauth/${props.instance}/${props.sessionID}/callback`
    await axios(checkUrl)
  }

  createEffect(() => {
    fetchToken()
  })

  return <p>Loading...</p>
}
