import { For, Match, Show, Switch } from 'solid-js'
import { Note } from '~/components/features/TimeLine'

export default function NoteCard(props: Note) {
  return (
    <li class="border-b py-[14px] px-2">
      <Switch>
        <Match when={props.renote}>
          <div>
            <header class="flex">
              <span class="font-bold text-sm">
                {props.user.name ? props.user.name : `@${props.user.username}`}
              </span>
              <span class="text-xs">がリノートしました</span>
              <Show when={props.text}>
                <p>{props.text}</p>
              </Show>
            </header>
            <div class="flex items-center border border-dotted">
              <img
                class="w-12 h-12 m-0 mb-auto rounded-full"
                src={
                  props.renote?.user.avatarUrl && props.renote?.user.avatarUrl
                }
              />
              <div class="w-full ml-2">
                <header>
                  <span class="font-bold text-sm">
                    {props.renote?.user.name
                      ? props.renote?.user.name
                      : `@${props.renote?.userId}`}
                  </span>
                  <span class="ml-2 text-xs">
                    @{props.renote?.user.username}
                  </span>
                </header>
                <p class="break-words">{props.renote?.text}</p>
              </div>
            </div>
            <Show when={props.renote?.files?.length}>
              <div
                class={`grid gap-2 grid-rows-1 aspect-auto mt-1 ${
                  props.renote?.files?.length && props.renote?.files?.length > 1
                    ? 'grid-cols-2'
                    : ''
                }`}
              >
                <For each={props.renote?.files}>
                  {file => (
                    <img
                      class="col-span-1 row-span-1 w-full h-full"
                      src={file.thumbnailUrl}
                    />
                  )}
                </For>
              </div>
            </Show>
          </div>
        </Match>
        <Match when={!props.renote}>
          <div class="flex items-center">
            <img
              class="w-12 h-12 m-0 mb-auto rounded-full"
              src={props.user.avatarUrl && props.user.avatarUrl}
            />
            <div class="w-full ml-2">
              <header>
                <span class="font-bold text-sm">
                  {props.user.name ? props.user.name : `@${props.user.id}`}
                </span>
                <span class="ml-2 text-xs">@{props.user.username}</span>
              </header>
              <p class="break-words">{props.text}</p>
            </div>
          </div>
          <Show when={props.files?.length}>
            <div
              class={`grid gap-2 grid-rows-1 aspect-auto mt-1 ${
                props.files?.length && props.files?.length > 1
                  ? 'grid-cols-2'
                  : ''
              }`}
            >
              <For each={props.files}>
                {file => (
                  <img
                    class="col-span-1 row-span-1 w-full h-full"
                    src={file.thumbnailUrl}
                  />
                )}
              </For>
            </div>
          </Show>
        </Match>
      </Switch>
    </li>
  )
}
