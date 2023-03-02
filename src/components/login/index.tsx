import { createSignal } from 'solid-js'
import { Title } from 'solid-start'
import { v4 as uuidv4 } from 'uuid'

const [sessionID, setSessionID] = createSignal('')

const createUuid = () => {
  return uuidv4()
}

export default function Login() {
  return (
    <>
      <Title>Login</Title>
      <p>this is login page</p>
    </>
  )
}
