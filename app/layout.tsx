import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

import './globals.css'

import Sidebar from '@/components/sidebar'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotiplay | Place to play your favorite music',
  description: 'Spotiplay is a place to play your favorite music',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={font.className} suppressHydrationWarning={true}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  )
}
