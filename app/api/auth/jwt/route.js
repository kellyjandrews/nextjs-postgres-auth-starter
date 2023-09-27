import KJUR from 'jsrsasign'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const res = await request.json()
  const iat = Math.round(new Date().getTime() / 1000) - 30
  const exp = iat + 60 * 60 * 2
  const oHeader = { alg: 'HS256', typ: 'JWT' }
  const zoom_key = process.env.ZOOM_SDK_KEY
  const zoom_secret = process.env.ZOOM_SDK_SECRET

  const oPayload = {
    app_key: zoom_key,
    tpc: res.topic,
    role_type: res.roleType,
    user_identity: res.userIdentity,
    session_key: res.sessionKey,
    version: 1,
    iat: iat,
    exp: exp,
  }
  console.log(oPayload)

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, zoom_secret)

  return NextResponse.json(
    {
      signature: signature,
    },
    { status: 200 }
  )
}
