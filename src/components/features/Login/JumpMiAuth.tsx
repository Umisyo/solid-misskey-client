import axios from 'axios'
import { createSignal } from 'solid-js'
import { Form } from 'solid-start/data/Form'
import { v4 as uuidv4 } from 'uuid'

export default function JumpMiAuth() {
  const sessionID = uuidv4()
  const [requestInstance, setRequestInstance] = createSignal('')
  const hundleSubmit = () => {
    axios(
      `${
        import.meta.env.VITE_APP_URL
      }/api/miauth/${requestInstance()}/${sessionID}/login`
    ).then(res => {
      window.location.href = res.headers['location'] || '/'
    })
  }
  return (
    <>
      <Form onSubmit={hundleSubmit}>
        <input
          required
          placeholder="インスタンス名を入力してください"
          value={requestInstance()}
          onInput={e => setRequestInstance(e.currentTarget.value)}
        />
        <button>Login now</button>
      </Form>
    </>
  )
}
