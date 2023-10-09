'use client'

import SongItem from '@/components/song-item'

import { Song } from '@/types/general-types'

interface IPageContentProps {
   songs?: Song[]
}

export default function PageContent({ songs }: IPageContentProps) {
   if (songs?.length === 0) {
      return <div className='mt-4 text-neutral-400'>No songs available.</div>
   }

   return (
      <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8'>
         {songs?.map((item) => (
            <SongItem key={item.id} data={item} onClick={() => {}} />
         ))}
      </div>
   )
}
