import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Song } from '@/types/general-types'

const getSongs = async (): Promise<Song[]> => {
   const supabase = createServerComponentClient({ cookies: cookies })

   const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('created_at', { ascending: false })
   if (error) console.error(error)

   return (data as any) || []
}

export default getSongs
