import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { passcode, roomname, host } = await req.json()
  let chatroom = await prisma.ChatRoom.findFirst({
    where: {
      enabled: true,
    },
  })

  if (!chatroom) {
    if (host === true) {
      chatroom = await prisma.ChatRoom.create({
        data: {
          passcode,
          roomname,
        },
      })
    } else {
      return NextResponse.json(
        { error: 'No chat room available' },
        { status: 200 }
      )
    }
  }
  return NextResponse.json(chatroom, { status: 200 })
}
