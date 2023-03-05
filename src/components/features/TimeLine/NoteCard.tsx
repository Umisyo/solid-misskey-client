import { Match, Show, Switch } from 'solid-js'
import { Note } from '~/components/features/TimeLine'

export default function NoteCard(props: Note) {
  return (
    <li class="border-b px-3 py-2">
      <Switch>
        <Match when={props.renote}>
          <header>
            <span class="font-bold text-sm">
              {props.user.name ? props.user.name : `@${props.userId}`}
            </span>
            <span class="text-xs">がリノートしました</span>
            <Show when={props.text}>
              <p>{props.text}</p>
            </Show>
          </header>
          <div class="border border-dotted">
            <header>
              <span class="font-bold text-xs">
                {props.user.name ? props.user.name : `@${props.userId}`}
              </span>
            </header>
            <p class="break-words text-xs">{props.renote?.text}</p>
          </div>
        </Match>
        <Match when={!props.renote}>
          <div>
            <header>
              <span class="font-bold text-sm">
                {props.user.name ? props.user.name : `@${props.userId}`}
              </span>
              <span class="ml-2 text-xs">@{props.userId}</span>
            </header>
            <p class="break-words">{props.text}</p>
          </div>
        </Match>
      </Switch>
    </li>
  )
}
