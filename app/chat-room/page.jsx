import SignOut from '../../components/sign-out'
import UIToolKit from '../../components/ui-toolkit'
import { getUser, getChatroom, getJWT } from '../../lib/fetch'
import { getServerSession } from 'next-auth/next'

export default async function ChatRoom() {
  const session = await getServerSession()
  const user = await getUser(session)
  const chatroom = await getChatroom(user)
  const signature = await getJWT({ chatroom, user })

  return (
    <div>
      <UIToolKit signature={signature} chatroom={chatroom} user={user} />
      <SignOut />
    </div>
  )
}
