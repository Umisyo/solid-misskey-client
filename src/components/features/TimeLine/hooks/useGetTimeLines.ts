import axios from 'axios'
import { Note, TimeLineChannel } from '~/components/features/TimeLine'

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
