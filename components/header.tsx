'use client'

import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { toast } from 'react-hot-toast'

import useAuthModal from '@/hooks/use-auth-modal'
import { useUser } from '@/hooks/use-user'

import Button from './button'

interface IHeaderProps {
   children: React.ReactNode
   className?: string
}

const Header: React.FC<IHeaderProps> = ({ children, className }) => {
   const router = useRouter()
   const authModal = useAuthModal()

   const supabaseClient = useSupabaseClient()
   const { user } = useUser()

   const handleLogOut = async () => {
      // handle logout
      const { error } = await supabaseClient.auth.signOut()
      // TODO: reset any playing songs
      router.refresh()

      if (error) toast.error(error.message)
      else toast.success('Logout success')
   }

   return (
      <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
         <div className='flex items-center justify-between w-full mb-4'>
            <div className='items-center hidden md:flex gap-x-2'>
               <button
                  onClick={() => router.back()}
                  className='flex items-center justify-center transition bg-black rounded-full hover:opacity-75'>
                  <RxCaretLeft size={32} className='text-white' />
               </button>
               <button
                  onClick={() => router.forward()}
                  className='flex items-center justify-center transition bg-black rounded-full hover:opacity-75'>
                  <RxCaretRight size={32} className='text-white' />
               </button>
            </div>
            {/* responsive */}
            <div className='flex items-center md:hidden gap-x-2'>
               <button className='flex items-center justify-center p-2 transition bg-white rounded-full hover:opacity-75'>
                  <HiHome className='text-black' size={20} />
               </button>
               <button className='flex items-center justify-center p-2 transition bg-white rounded-full hover:opacity-75'>
                  <BiSearch className='text-black' size={20} />
               </button>
            </div>
            {/* button auth */}
            <div className='flex items-center justify-between gap-x-4'>
               {user ? (
                  <div className='flex items-center gap-x-4'>
                     <Button
                        className='px-6 py-2 text-white bg-rose-500'
                        onClick={handleLogOut}>
                        Logout
                     </Button>
                     <Button onClick={() => router.push('/account')} className='bg-white'>
                        <FaUserAlt size={18} />
                     </Button>
                  </div>
               ) : (
                  <>
                     <div>
                        <Button
                           onClick={authModal.onOpen}
                           className='font-medium bg-transparent text-neutral-300'>
                           Sign up
                        </Button>
                     </div>
                     <div>
                        <Button onClick={authModal.onOpen} className='px-6 py-2 bg-white'>
                           Log in
                        </Button>
                     </div>
                  </>
               )}
            </div>
         </div>

         {children}
      </div>
   )
}

export default Header
