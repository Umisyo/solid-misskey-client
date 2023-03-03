import { Switch, Match } from 'solid-js'
import { useSearchParams } from 'solid-start'
import GetAuthToken from '~/components/features/login/GetAuthToken'
import JumpMiAuth from '~/components/features/login/JumpMiAuth'

export default function Login() {
  const [param] = useSearchParams()
  return (
    <>
      <Switch>
        <Match when={!param.session}>
          <JumpMiAuth />
        </Match>
        <Match when={param.session}>
          <GetAuthToken instance={param.instance} sessionID={param.session} />
        </Match>
      </Switch>
    </>
  )
}
