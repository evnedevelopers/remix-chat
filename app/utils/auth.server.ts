import { users } from "~/utils/mocks/users";
import { json, createCookieSessionStorage, redirect } from '@remix-run/node'
import * as process from "node:process";
import { findUserProfile } from "~/utils/profile.server";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET required');
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'auth-session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  }
});

async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set('userId', userId);

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    }
  })
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

export async function getAuthUser(request: Request) {
  const session =  await getUserSession(request);
  const userId = session.get('userId');

  if (typeof userId !== 'string') return null;

  const user = findUserProfile(userId);

  return user || null;
}


export const login = ({
  username,
  password,
}: {
  username: string,
  password: string
}) => {
  const user = users.find((user) => user.email === username);

  if (!user || user.password !== password) {
    return json({ error: `Incorrect login` }, { status: 400 });
  }

  return createUserSession(user.id, '/chat');
}

export const logout = async (request: Request) => {
  const session = await getUserSession(request);

  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    }
  });
}