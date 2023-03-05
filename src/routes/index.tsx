import { createEffect } from 'solid-js'
import { Title, useNavigate } from 'solid-start'
import TimeLine from '~/components/features/TimeLine'

export default function Home() {
  createEffect(() => {
    if (localStorage?.length === 0 || !localStorage?.getItem('isLogin')) {
      const navigate = useNavigate()
      navigate('/login')
    }
  })
  return (
    <main class="h-screen">
      <Title>Solid misskey client</Title>
      <TimeLine />
    </main>
  )
}
