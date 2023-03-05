import { createEffect } from 'solid-js'
import { Title, useNavigate } from 'solid-start'
import Login from '~/components/features/Login'

export default function LoginPage() {
  createEffect(() => {
    if (localStorage?.getItem('isLogin')) {
      const navigate = useNavigate()
      navigate('/')
    }
  })
  return (
    <>
      <Title>login</Title>
      <Login />
    </>
  )
}
