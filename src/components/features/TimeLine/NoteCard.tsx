import { Note } from '~/components/features/TimeLine'

export default function NoteCard(props: Note) {
  return (
    <li class="border-b">
      <header>
        <span class="font-bold">{props.user.name}</span>
        <span class="ml-2">{props.userId}</span>
      </header>
      <p>{props.text}</p>
      <footer>
        <span>{props.createdAt}</span>
      </footer>
    </li>
  )
}
