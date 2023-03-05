import { v4 as uuidv4 } from 'uuid'
import createWebsocket from '@solid-primitives/websocket'
import { createEffect, createSignal, Index, Show } from 'solid-js'
import NoteCard from '~/components/features/TimeLine/NoteCard'
import { Note, TimeLineChannel } from '~/components/features/TimeLine'

export interface ColumnProps {
  channel: TimeLineChannel
}

export default function Column(props: ColumnProps) {
  const socketUrl = `wss://${localStorage.getItem(
    'instance'
  )}/streaming?i=${localStorage.getItem('UserToken')}`

  const [notes, setNotes] = createSignal<Note[]>([])

  const onMessage = (msg: MessageEvent) => {
    const messageDataJson: Note = JSON.parse(msg.data).body.body
    setNotes(prev => [...prev, messageDataJson])
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
      <div class="flex flex-col w-96 max-h-full">
        <header>
          <span>{props.channel}</span>
        </header>
        <ul class="overflow-hidden overflow-y-scroll min-h-0">
          <Index each={notes().reverse()}>
            {note => (
              <li class="border-l border-r">
                <NoteCard {...note()} />
              </li>
            )}
          </Index>
        </ul>
      </div>
    </Show>
  )
}
