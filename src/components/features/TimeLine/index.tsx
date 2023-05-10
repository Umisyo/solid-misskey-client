import axios from 'axios'
import { createSignal, For } from 'solid-js'
import { useNavigate } from 'solid-start'
import Column from '~/components/features/TimeLine/Column'
import { TimeLineChannel } from '~/components/features/TimeLine/types/TimeLineChannel'

const timeLineChannels = [
  'globalTimeline',
  'homeTimeline',
  'hybridTimeline',
  'localTimeline',
  ''
] as const

const isTimeLineChannel = (channel: string): channel is TimeLineChannel => {
  return timeLineChannels.includes(channel as TimeLineChannel)
}

export default function TimeLine() {
  const [channels, setChannels] = createSignal<TimeLineChannel[]>([
    'globalTimeline'
  ])
  const [selectChannel, setSelectChannel] = createSignal<TimeLineChannel>('')

  const handleSelect = (
    event: InputEvent & {
      currentTarget: HTMLSelectElement
      target: Element
    }
  ) => {
    const channel = event.currentTarget.value
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

  const handleDelete = (index: number) => {
    const newChannels = channels().filter((_, i) => i !== index)
    setChannels(newChannels)
  }

  const navigate = useNavigate()

  return (
    <>
      <label for="selectChannel">
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
        </select>
      </label>
      <button onClick={addChannel}>Add</button>
      <div>
        <button
          onClick={() => {
            axios
              .post(`${import.meta.env.VITE_APP_URL}/api/logout`)
              .finally(() => {
                navigate('/login')
              })
          }}
        >
          Logout
        </button>
      </div>
      <div class="flex overflow-x-scroll h-screen">
        <For each={channels()}>
          {(channel, index) => (
            <Column
              channel={channel}
              handleDelete={handleDelete}
              index={index()}
            />
          )}
        </For>
      </div>
    </>
  )
}
