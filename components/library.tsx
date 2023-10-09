'use client'

import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'

import { useUser } from '@/hooks/use-user'
import useAuthModal from '@/hooks/use-auth-modal'
import useUploadModal from '@/hooks/use-upload-modal'

import { Song } from '@/types/general-types'

interface ILibraryProps {
   songs: Song[]
}

export default function Library({ songs }: ILibraryProps) {
   const authModal = useAuthModal()
   const uploadModal = useUploadModal()
   const { user, subscription } = useUser()

   const onClick = () => {
      if (!user) return authModal.onOpen()

      // todo: check if user has subscription

      // upload modal
      return uploadModal.onOpen()
   }

   return (
      <div className='flex flex-col'>
         <div className='flex items-center justify-between px-5 pt-4'>
            <div className='inline-flex items-center gap-x-2'>
               <TbPlaylist className='text-neutral-400' size={26} />
               <p className='font-medium text-neutral-400 text-md'>Your Library</p>
            </div>
            <AiOutlinePlus
               onClick={onClick}
               size={20}
               className='cursor-pointer transition text-neutral-400 hover:text-white'
            />
         </div>
         <div className='flex flex-col px-5 mt-4 gap-y-2'>
            {songs.map((song) => (
               <div key={song.id}>{song.title}</div>
            ))}
         </div>
      </div>
   )
}
