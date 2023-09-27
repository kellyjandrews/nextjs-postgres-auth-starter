'use client'

import { useEffect, useState } from 'react'
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css'

// import { signOut } from 'next-auth/react'

function useUIToolKit() {
  const loadUIKit = async () =>
    (await import('@zoom/videosdk-ui-toolkit')).default
  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadUIKit()
    }
  }, [])
}

export default function UIToolKit({ signature, chatroom, user }) {
  const [roomState, setRoomState] = useState('preview')
  useUIToolKit()

  useEffect(() => {
    if (roomState === 'room') {
      let UIToolKitConfig = {
        videoSDKJWT: signature.signature,
        sessionName: chatroom.roomname,
        userName: user.email,
        sessionPasscode: chatroom.passcode.substring(0, 10),
        features: ['video', 'audio'],
      }
      const initUIToolKit = (config) => {
        window.ZoomUIToolKit.init(config)
        window.ZoomUIToolKit.join()
        window.ZoomUIToolKit.subscribe('uitoolkit-destroy', () => {})
      }
      initUIToolKit(UIToolKitConfig)
    }
  }, [roomState, signature, chatroom, user])
  if (!signature || !chatroom || !user) return

  if (roomState === 'preview') {
    return (
      <div>
        <app-previewkit />
        <button onClick={() => setRoomState('room')}>Continue</button>
      </div>
    )
  }
  if (roomState === 'room') {
    // if (typeof window.ZoomUIToolKit === 'undefined') return

    return (
      <div id="UIToolkit">
        <app-uitoolkit></app-uitoolkit>
      </div>
    )
  }
}

// useEffect(() => {
//   if (roomState === 'joined') {

//   }
// }, [roomState, chatRoom, saveChatRoom])
