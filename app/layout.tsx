import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

import './globals.css'

import SupabaseProvider from '@/providers/supabase-provider'
import UserProvider from '@/providers/user-provider'
import ModalProvider from '@/providers/modal-provider'
import ToasterProvider from '@/providers/toaster-provider'

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
            <ToasterProvider />
            <SupabaseProvider>
               <UserProvider>
                  <ModalProvider />
                  <Sidebar>{children}</Sidebar>
               </UserProvider>
            </SupabaseProvider>
         </body>
      </html>
   )
}
