import { createEffect } from 'solid-js'
import { useNavigate } from 'solid-start'

export interface GetAuthTokenProps {
  instance: string
  sessionID: string
}

export default function GetAuthToken(props: GetAuthTokenProps) {
  const fetchToken = async () => {
    const checkUrl = `https://${props.instance}/api/miauth/${props.sessionID}/check`
    return await fetch(checkUrl, { method: 'POST' })
      .then(res => {
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`)
        }
        return res.json()
      })
      .then(text => {
        if (text.token) {
          localStorage.setItem('isLogin', text.ok)
          localStorage.setItem('UserToken', text.token)
          localStorage.setItem('UserId', text.user.id)
          localStorage.setItem('UserName', text.user.username)
          localStorage.setItem(
            'TimeLine',
            JSON.stringify({
              stream: 'homeTimeline',
              api: 'timeline'
            })
          )
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  createEffect(() => {
    fetchToken()
    const navigate = useNavigate()
    navigate('/')
  })

  return <p>Loading...</p>
}
