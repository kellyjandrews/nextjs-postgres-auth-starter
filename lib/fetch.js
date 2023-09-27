import { randomUUID } from 'crypto'

const defaultPOSTOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
}

async function callAPI(url, options) {
  try {
    const res = await fetch(url, options)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (e) {
    console.warn(e)
  }
}

async function POST(url, options) {
  let outgoingOptions = Object.assign({}, defaultPOSTOptions, options)
  return await callAPI(url, outgoingOptions)
}

async function getUser({ user }) {
  if (!user) return
  const { email } = user
  return await POST('http://localhost:3000/api/user', {
    body: JSON.stringify({
      email: email,
    }),
  })
}
async function getChatroom(user) {
  if (!user) return
  return await POST('http://localhost:3000/api/chatroom', {
    body: JSON.stringify({
      roomname: randomUUID(),
      passcode: randomUUID(),
      host: user.host,
    }),
  })
}

async function getJWT(opts) {
  if (!opts || !opts.chatroom || !opts.user) return

  return await POST('http://localhost:3000/api/auth/jwt', {
    body: JSON.stringify({
      topic: opts.chatroom.roomname,
      roleType: opts.user.host === true ? 1 : 0,
      userIdentity: opts.user.email,
      sessionKey: opts.chatroom.passcode,
    }),
  })
}

export { getUser, getChatroom, getJWT }
