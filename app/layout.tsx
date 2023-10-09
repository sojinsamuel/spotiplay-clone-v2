import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

import './globals.css'

import SupabaseProvider from '@/providers/supabase-provider'
import UserProvider from '@/providers/user-provider'
import ModalProvider from '@/providers/modal-provider'
import ToasterProvider from '@/providers/toaster-provider'

import Sidebar from '@/components/sidebar'

import getSongByUserId from '@/actions/get-song-by-user-id'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Spotiplay | Place to play your favorite music',
   description: 'Spotiplay is a place to play your favorite music',
}

export const revalidate = 0

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const userSongs = await getSongByUserId()

   return (
      <html lang='en'>
         <body className={font.className} suppressHydrationWarning={true}>
            <ToasterProvider />
            <SupabaseProvider>
               <UserProvider>
                  <ModalProvider />
                  {/* Layout Sidebar */}
                  <Sidebar songs={userSongs}>{children}</Sidebar>
               </UserProvider>
            </SupabaseProvider>
         </body>
      </html>
   )
}
