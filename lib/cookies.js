import { serialize } from 'cookie'

export const createCookie = (token, sessionCookie) => {
  return serialize('auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    ...(sessionCookie ? {} : { maxAge: 21600 }), // default to 6 hours
    path: '/',
  })
}

export const destroyCookie = () => {
  return serialize('auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  })
}
