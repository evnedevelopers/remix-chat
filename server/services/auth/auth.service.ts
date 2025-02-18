import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import { UserService } from "../user/user.service";
import { BcryptTool } from "../tools/bcrypt.tool";

const sessionSecret = process.env.SESSION_SECRET!;

export class AuthService {
  storage = createCookieSessionStorage({
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

  constructor(private readonly request: Request) {}

  async createUserSession(userId: number, redirectTo: string) {
    const session = await this.storage.getSession();
    session.set('userId', userId);

    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await this.storage.commitSession(session),
      }
    });
  }

  async userSession() {
    return this.storage.getSession(this.request.headers.get('Cookie'));
  }

  async authUser() {
    const session = await this.userSession();
    const userId = session.get('userId');

    if (typeof userId !== 'number') return null;

    const user = await UserService.findById(+userId);

    return user || null;
  }

  async login(email: string, password: string) {
    const user = await UserService.findByEmail(email);

    const compared = await BcryptTool.compare(password, user?.password)

    if (!user || !compared) {
      return json({ error: `Incorrect login` }, { status: 400 });
    }

    return this.createUserSession(user.id, '/chat');
  }

  async logout() {
    const session = await this.userSession();

    return redirect('/', {
      headers: {
        'Set-Cookie': await this.storage.destroySession(session),
      }
    })
  }
}