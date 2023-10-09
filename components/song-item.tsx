'use client'

import Image from 'next/image'

import useLoadImage from '@/hooks/use-load-image'

import PlayButton from './play-button'

import { Song } from '@/types/general-types'

interface ISongItemProps {
   data: Song
   onClick: (id: string) => void
}

export default function SongItem({ data, onClick }: ISongItemProps) {
   const imagePath = useLoadImage(data)

   return (
      <div
         onClick={() => onClick(data.id)}
         className='relative flex flex-col items-center justify-center p-3 overflow-hidden transition rounded-md cursor-pointer gap-x-4 bg-neutral-400/5 hover:bg-neutral-400/10 group'>
         <div className='relative w-full h-full overflow-hidden rounded-md aspect-square'>
            <Image className='object-cover' src={imagePath || '/images/liked.png'} alt='Image Song' fill />
         </div>
         <div className='flex flex-col items-start w-full py-4 gap-y-1'>
            <p className='w-full font-semibold text-white truncate'>{data.title}</p>
            <p className='w-full pb-3 text-sm truncate text-neutral-400'>By {data.author}</p>
         </div>
         <div className='absolute text-white bottom-24 right-5'>
            <PlayButton />
         </div>
      </div>
   )
}
