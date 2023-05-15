import axios from 'axios'
import { Title, useRouteData } from 'solid-start'
import { createServerData$, redirect } from 'solid-start/server'
import https from 'https'
import TimeLine from '~/components/features/TimeLine'
import { createEffect } from 'solid-js'
import CreateNote from '~/components/features/CreateNote'

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const isLogin = (
      await axios.get(`${import.meta.env.VITE_APP_URL}/api/user/isLogin`, {
        headers: { Cookie: request.headers.get('Cookie') },
        httpsAgent:
          import.meta.env.MODE === 'development'
            ? new https.Agent({ rejectUnauthorized: false })
            : ''
      })
    ).data

    if (!isLogin) throw redirect('/login')
  })
}

export default function Home() {
  const serverData = useRouteData<typeof routeData>()
  createEffect(() => {
    serverData()
  })
  return (
    <main class="h-screen">
      <Title>Solid misskey client</Title>
      <div class="flex">
        <CreateNote />
        <TimeLine />
      </div>
    </main>
  )
}
