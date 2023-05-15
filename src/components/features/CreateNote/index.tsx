import axios from 'axios'
import { createSignal } from 'solid-js'
import { Form } from 'solid-start/data/Form'

export default function CreateNote() {
  const [text, setText] = createSignal('')

  const handleSubmit = () => {
    axios.post(`${import.meta.env.VITE_APP_URL}/api/misskey/notes/create`, {
      text: text()
    })
  }

  return (
    <div class="w-60 px-4 pt-12 max-h-full border-x">
      <Form onsubmit={handleSubmit}>
        <textarea
          class="w-full h-56 border"
          placeholder="言いたいことは？"
          onChange={e => setText(e.currentTarget.value)}
        />
        <button class="border px-3 rounded" type="submit" value={text()}>
          送信
        </button>
      </Form>
    </div>
  )
}
