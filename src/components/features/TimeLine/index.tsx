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
  createdAt: string
  text: string | null
  cw: string | null
  user: User
  userId: string
  visibility: string
}

export type TimeLineChannel =
  | 'globalTimeline'
  | 'homeTimeline'
  | 'hybridTimeline'
  | 'localTimeline'
  | 'main'

export default function TimeLine() {
  return (
    <>
      <p>TimeLine</p>
      <div class="flex space-x-4">
        <Column channel="globalTimeline" />
        <Column channel="localTimeline" />
      </div>
    </>
  )
}
