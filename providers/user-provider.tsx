'use client'

import { MyUserContextProvider } from '@/hooks/use-user'

interface UserProviderProps {
   children: React.ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
   return <MyUserContextProvider>{children}</MyUserContextProvider>
}
