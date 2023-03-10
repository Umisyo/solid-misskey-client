import { v4 as uuidv4 } from 'uuid'
import {
  createEffect,
  createResource,
  For,
  Match,
  Show,
  Switch
} from 'solid-js'
import NoteCard from '~/components/features/TimeLine/NoteCard'
import { Note, TimeLineChannel } from '~/components/features/TimeLine'
import axios from 'axios'

export interface ColumnProps {
  channel: TimeLineChannel
  handleDelete: (index: number) => void
  index: number
}

export default function Column(props: ColumnProps) {
  const getTimeLines = async () => {
    const requestChannel =
      props.channel === 'homeTimeline'
        ? 'timeline'
        : props.channel
            .split(/(?=[A-Z])/)
            .join('-')
            .toLowerCase()
    const defaultNotes: Note[] = (
      await axios.get(
        `${
          import.meta.env.VITE_APP_URL
        }/api/misskey/notes?channel=${requestChannel}`
      )
    ).data.notes
    return defaultNotes
  }

  const getRequestParams = async () => {
    const instance = (
      await axios.get(`${import.meta.env.VITE_APP_URL}/api/user/instance`)
    ).data.instance
    const token = (
      await axios.get(`${import.meta.env.VITE_APP_URL}/api/user/token`)
    ).data.token

    return { instance, token }
  }

  const [notes, { mutate }] = createResource<Note[]>(getTimeLines)
  const [requestParams] = createResource(getRequestParams)

  createEffect(() => {
    if (requestParams()?.instance && requestParams()?.token) {
      const socketUrl = `wss://${requestParams()?.instance}/streaming?i=${
        requestParams()?.token
      }`
      const socket = new WebSocket(socketUrl)

      socket.onmessage = msg => {
        const messageDataJson: Note = JSON.parse(msg.data).body.body
        mutate(prev => (prev ? [messageDataJson, ...prev] : [messageDataJson]))
      }
      const requestJson = `{
            "type": "connect",
            "body": {
            "channel": "${props.channel}",
            "id": "${uuidv4()}"
          }
        }`
      socket.onopen = () => {
        socket.send(requestJson)
      }
      return socket.close
    }
  })

  return (
    <Show when={props.channel !== 'main'}>
      <div class="flex flex-col w-96 max-h-full border-l border-r">
        <header class="flex items-center border min-h-[2.5rem] px-2">
          <span>{props.channel}</span>
          <button
            class="m-0 ml-auto"
            onClick={() => {
              props.handleDelete(props.index)
            }}
          >
            x
          </button>
        </header>
        <Switch>
          <Match when={notes.loading}>
            <p>Loading...</p>
          </Match>
          <Match when={!notes.loading}>
            <ul class="overflow-hidden overflow-y-scroll min-h-0">
              <For each={notes()}>
                {note => (
                  <li>
                    <NoteCard {...note} />
                  </li>
                )}
              </For>
            </ul>
          </Match>
        </Switch>
      </div>
    </Show>
  )
}
