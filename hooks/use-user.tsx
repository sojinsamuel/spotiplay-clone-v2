/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, createContext, useContext, useMemo } from 'react'
import { useUser as useSupaUser, useSessionContext } from '@supabase/auth-helpers-react'
import { User } from '@supabase/auth-helpers-nextjs'

import { UserDetails, Subscription } from '@/types/general-types'

type UserContextType = {
   accessToken: string | null
   user: User | null
   userDetails: UserDetails | null
   isLoading: boolean
   subscription: Subscription | null
}

export interface Props {
   [propName: string]: any
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function MyUserContextProvider(props: Props) {
   const {
      session,
      isLoading: isLoadingUser,
      supabaseClient: supabase,
   } = useSessionContext()
   const user = useSupaUser()
   const accessToken = session?.access_token ?? null

   const [isLoadingData, setIsloadingData] = useState(false)
   const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
   const [subscription, setSubscription] = useState<Subscription | null>(null)

   const getUserDetails = () => supabase.from('users').select('*').single()
   const getSubscription = () =>
      supabase
         .from('subscriptions')
         .select('*, prices(*, products(*))')
         .in('status', ['trialing', 'active'])
         .single()

   useEffect(() => {
      if (user && !isLoadingData && !userDetails && !subscription) {
         setIsloadingData(true)
         Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {
            const userDetailsPromise = results[0]
            const subscriptionPromise = results[1]
            if (userDetailsPromise.status === 'fulfilled')
               setUserDetails(userDetailsPromise.value.data as UserDetails)
            if (subscriptionPromise.status === 'fulfilled')
               setSubscription(subscriptionPromise.value.data as Subscription)

            setIsloadingData(false)
         })
      } else if (!user && !isLoadingUser && !isLoadingData) {
         setUserDetails(null)
         setSubscription(null)
      }
   }, [user, isLoadingUser])

   const value = useMemo(
      () => ({
         accessToken,
         user,
         userDetails,
         isLoading: isLoadingUser || isLoadingData,
         subscription,
      }),
      [accessToken, user, userDetails, isLoadingUser, isLoadingData, subscription]
   )

   return <UserContext.Provider value={value} {...props} />
}

export function useUser() {
   const context = useContext(UserContext)
   if (context === undefined) throw new Error(`useUser must in a MyUserContextProvider.`)
   return context
}
