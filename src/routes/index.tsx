import { Title, useNavigate } from 'solid-start'

export default function Home() {
  if (typeof localStorage === 'undefined' || !localStorage?.isLogin) {
    const navigate = useNavigate()
    navigate('/login')
  }
  return (
    <main>
      <Title>Solid misskey client</Title>
    </main>
  )
}
