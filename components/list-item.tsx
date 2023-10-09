'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaPlay } from 'react-icons/fa'

interface IListItemProps {
   name: string
   image: string
   href: string
}

export default function ListItem({ name, image, href }: IListItemProps) {
   const router = useRouter()

   const onClick = () => {
      // add auth before push
      router.push(href)
   }

   return (
      <button
         onClick={onClick}
         className='relative flex items-center pr-4 overflow-hidden group rounded-md gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20'>
         <div className='relative min-h-[64px] min-w-[64px]'>
            <Image src={image} alt='Liked Image' fill className='object-cover' />
         </div>
         <p className='py-5 font-medium text-white truncate'>{name}</p>
         <div className='absolute flex items-center justify-center p-4 bg-green-500 rounded-full opacity-0 transition drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110'>
            <FaPlay className='text-black' />
         </div>
      </button>
   )
}
