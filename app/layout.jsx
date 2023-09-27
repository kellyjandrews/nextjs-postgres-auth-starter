// These styles apply to every route in the application
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const title = 'Zoom Video SDK UI Tool Kit'

export const metadata = {
  title,
  themeColor: '#FFF',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.variable}>
        <Toaster />
        <Suspense fallback="Loading..." />
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
