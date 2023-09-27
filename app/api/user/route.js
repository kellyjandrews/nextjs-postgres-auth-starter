import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { email } = await req.json()
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  return NextResponse.json(user, { status: 200 })
}
