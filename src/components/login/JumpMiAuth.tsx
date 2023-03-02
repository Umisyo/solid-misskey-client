import { createSignal } from 'solid-js'
import { Form } from 'solid-start/data/Form'
import { v4 as uuidv4 } from 'uuid'

export default function JumpMiAuth() {
  const sessionID = uuidv4()
  const [requestInstance, setRequestInstance] = createSignal('')
  const hundleSubmit = () => {
    const miAuthUrl = `https://${requestInstance()}/miauth/${sessionID}?callback=http://localhost:3000/login?instance=${requestInstance()}`
    console.log(miAuthUrl)
    window.location.href = miAuthUrl
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
