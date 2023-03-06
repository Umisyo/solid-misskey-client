import { redirect } from 'solid-start/server'
import { createCookieSessionStorage } from 'solid-start/session'

const storage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
    httpOnly: true
  }
})

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
}

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get('Cookie'))
  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session)
    }
  })
}
export async function createUserSession(
  isLogin: boolean,
  token: string,
  userName: string,
  avaterUrl: string,
  redirectTo: string
) {
  const session = await storage.getSession()
  session.set('isLogin', isLogin)
  session.set('token', token)
  session.set('userName', encodeURIComponent(userName))
  session.set('avaterUrl', avaterUrl)

  const cookie = await storage.commitSession(session)

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': cookie
    }
  })
}
