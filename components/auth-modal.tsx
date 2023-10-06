'use client'

import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Auth } from '@supabase/auth-ui-react'

import useAuthModal from '@/hooks/use-auth-modal'

import Modal from './modal'

const AuthModal = () => {
   const supabaseClient = useSupabaseClient()
   const router = useRouter()
   const { session } = useSessionContext()
   const { onClose, isOpen } = useAuthModal()

   useEffect(() => {
      if (session) {
         router.refresh()
         onClose()
      }
   }, [onClose, router, session])

   const onChange = (open: boolean) => {
      if (!open) onClose()
   }

   return (
      <Modal
         title='Welcome to Spotiplay'
         description='Login / Register to your account'
         isOpen={isOpen}
         onChange={onChange}>
         <Auth
            supabaseClient={supabaseClient}
            theme='dark'
            magicLink={true}
            providers={['github']}
            appearance={{
               theme: ThemeSupa,
               style: { message: { color: '#fff' } },
               variables: { default: { colors: { brand: '#404040', brandAccent: '#22c55e' } } },
            }}
         />
      </Modal>
   )
}

export default AuthModal
