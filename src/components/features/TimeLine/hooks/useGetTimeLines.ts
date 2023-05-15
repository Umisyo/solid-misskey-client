import axios from 'axios'
import { Note } from '~/components/features/TimeLine/types/Note'
import { TimeLineChannel } from '~/components/features/TimeLine/types/TimeLineChannel'

export const useGetTimeLines = async (channel: TimeLineChannel) => {
  console.log(channel)
  const requestChannel =
    channel === 'homeTimeline'
      ? 'timeline'
      : channel
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
