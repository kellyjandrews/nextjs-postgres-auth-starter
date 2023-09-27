import prisma from '../../../../lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { email, password } = await req.json()
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (exists) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  } else {
    let host = false
    if (email === 'kelly@kellyjandrews.com') host = true
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
        host,
      },
    })
    return NextResponse.json(user)
  }
}
