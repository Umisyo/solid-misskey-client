import { User } from '~/components/features/TimeLine/types/User'

export interface Note {
  id: string
  renote: Note | null
  createdAt: string
  text: string | null
  cw: string | null
  user: User
  files: Array<object> | null
  userId: string
  visibility: string
}
