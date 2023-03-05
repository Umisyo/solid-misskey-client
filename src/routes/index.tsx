import { Title, useNavigate } from 'solid-start'
import TimeLine from '~/components/features/TimeLine'

export default function Home() {
  if (typeof localStorage === 'undefined' || !localStorage?.isLogin) {
    const navigate = useNavigate()
    navigate('/login')
  }
  return (
    <main class="h-screen">
      <Title>Solid misskey client</Title>
      <TimeLine />
    </main>
  )
}
