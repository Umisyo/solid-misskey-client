import { v4 as uuidv4 } from 'uuid'
import createWebsocket from '@solid-primitives/websocket'
import { createEffect, createSignal, Index } from 'solid-js'
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
    <>
      <ul class="flex flex-col-reverse w-1/3 justify-end">
        <Index each={notes()}>
          {note => (
            <li class="border-l border-r">
              <NoteCard {...note()} />
            </li>
          )}
        </Index>
      </ul>
    </>
  )
}
