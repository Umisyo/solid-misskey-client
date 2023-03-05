import { v4 as uuidv4 } from 'uuid'
import createWebsocket from '@solid-primitives/websocket'
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
import fetchAPI from '~/features/api/fetchAPI'

export interface ColumnProps {
  channel: TimeLineChannel
}

export default function Column(props: ColumnProps) {
  const socketUrl = `wss://${localStorage.getItem(
    'instance'
  )}/streaming?i=${localStorage.getItem('UserToken')}`

  const getTimeLines = async () => {
    const requestChannel =
      props.channel === 'homeTimeline'
        ? 'timeline'
        : props.channel
            .split(/(?=[A-Z])/)
            .join('-')
            .toLowerCase()
    const endpoint = `notes/${requestChannel}`
    const requestBody = {
      limit: 100
    }
    const defaultNotes: Note[] = await fetchAPI(endpoint, requestBody)
    return defaultNotes
  }

  const [notes, { mutate }] = createResource<Note[]>(getTimeLines)

  const onMessage = (msg: MessageEvent) => {
    const messageDataJson: Note = JSON.parse(msg.data).body.body
    mutate(prev => (prev ? [messageDataJson, ...prev] : [messageDataJson]))
  }
  const [connect, _, send, state] = createWebsocket(
    socketUrl,
    onMessage,
    (e: Event) => {
      console.error(e)
    },
    [],
    3,
    5000
  )

  createEffect(() => {
    connect()
  })

  createEffect(() => {
    if (state() === 1) {
      const requestJson = `{
          "type": "connect",
          "body": {
          "channel": "${props.channel}",
          "id": "${uuidv4()}"
        }
      }`
      send(requestJson)
    }
  })

  return (
    <Show when={props.channel !== 'main'}>
      <div class="flex flex-col w-96 max-h-full border-l border-r">
        <header class="border h-10">
          <span>{props.channel}</span>
        </header>
        <ul class="overflow-hidden overflow-y-scroll min-h-0">
          <Switch>
            <Match when={notes.loading}>
              <p>Loading...</p>
            </Match>
            <Match when={!notes.loading}>
              <For each={notes()}>
                {note => (
                  <li>
                    <NoteCard {...note} />
                  </li>
                )}
              </For>
            </Match>
          </Switch>
        </ul>
      </div>
    </Show>
  )
}
