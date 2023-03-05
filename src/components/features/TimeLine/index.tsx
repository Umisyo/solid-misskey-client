import { createSignal, Index } from 'solid-js'
import Column from '~/components/features/TimeLine/Column'

export type User = {
  id: string
  createdAt: string
  username: string
  host: string | null
  name: string
  onlineStatus: string
  avatarUrl: string
  avatarBlurhash: string
}

export interface Note {
  id: string
  renote: Note | null
  createdAt: string
  text: string | null
  cw: string | null
  user: User
  userId: string
  visibility: string
}

const timeLineChannels = [
  'globalTimeline',
  'homeTimeline',
  'hybridTimeline',
  'localTimeline',
  'main',
  ''
] as const

export type TimeLineChannel = (typeof timeLineChannels)[number]

export default function TimeLine() {
  const [channels, setChannels] = createSignal<TimeLineChannel[]>([
    'globalTimeline'
  ])
  const [selectChannel, setSelectChannel] = createSignal<TimeLineChannel>('')

  const isTimeLineChannel = (channel: string): channel is TimeLineChannel => {
    return timeLineChannels.includes(channel as TimeLineChannel)
  }

  const handleSelect = (
    Event: InputEvent & { currentTarget: HTMLSelectElement; target: Element }
  ) => {
    const channel = Event.currentTarget.value
    if (isTimeLineChannel(channel)) {
      setSelectChannel(channel)
    }
  }

  const addChannel = () => {
    if (selectChannel() === '') {
      return
    }
    setChannels([...channels(), selectChannel()])
  }

  return (
    <>
      <label for="selectChannnel">
        Add Channel
        <select
          name="channel"
          value={selectChannel()}
          onInput={e => handleSelect(e)}
        >
          <option value="globalTimeline">Global Timeline</option>
          <option value="homeTimeline">Home Timeline</option>
          <option value="hybridTimeline">Hybrid Timeline</option>
          <option value="localTimeline">Local Timeline</option>
          <option value="main">Main</option>
        </select>
      </label>
      <button onClick={addChannel}>Add</button>
      <div class="flex overflow-x-scroll h-screen">
        <Index each={channels()}>
          {channel => <Column channel={channel()} />}
        </Index>
      </div>
    </>
  )
}
