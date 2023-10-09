import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Song } from '@/types/general-types'

export default async function getSongByUserId(): Promise<Song[]> {
   const supabase = createServerComponentClient({ cookies: cookies })

   const { data: SessionData, error: sessionError } = await supabase.auth.getSession()
   if (sessionError) {
      console.error(sessionError)
      return []
   }

   const { data, error } = await supabase
      .from('songs')
      .select('*')
      .eq('user_id', SessionData?.session?.user.id)
      .order('created_at', { ascending: false })
   if (error) console.error(error)

   return (data as any) || []
}
