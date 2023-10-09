import uniqid from 'uniqid'
import { toast } from 'react-hot-toast'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

import { useUser } from '@/hooks/use-user'
import useUploadModal from '@/hooks/use-upload-modal'

import Modal from './modal'
import Input from './input'
import Button from './button'

const UploadModal = () => {
   const supabaseClient = useSupabaseClient()
   const router = useRouter()

   const { user } = useUser()
   const uploadModal = useUploadModal()

   const [isLoading, setIsLoading] = useState<boolean>(false)

   const { register, handleSubmit, reset } = useForm<FieldValues>({
      defaultValues: { title: '', author: '', song: null, image: null },
   })

   const onChange = (open: boolean) => {
      if (!open) {
         reset()
         uploadModal.onClose()
      }
   }

   const onSubmit: SubmitHandler<FieldValues> = async (values) => {
      // upload to supabase
      try {
         setIsLoading(true)

         const imageFile = values.image?.[0]
         const songFile = values.song?.[0]

         if (!imageFile || !songFile || !user) {
            toast.error('Missing fields.')
            return
         }

         const uniqueID = uniqid()

         // upload song
         const { data: songData, error: songError } = await supabaseClient.storage
            .from('songs')
            .upload(`song-${values.title}-${uniqueID}.mp3`, songFile, {
               cacheControl: '3600',
               upsert: false,
            })
         if (songError) {
            setIsLoading(false)
            return toast.error('Failed to upload song.')
         }

         //  upload image
         const { data: imageData, error: imageError } = await supabaseClient.storage
            .from('images')
            .upload(`image-${values.title}-${uniqueID}.png`, imageFile, {
               cacheControl: '3600',
               upsert: false,
            })
         if (imageError) {
            setIsLoading(false)
            return toast.error('Failed to upload image.')
         }

         const { error: supabaseError } = await supabaseClient.from('songs').insert({
            user_id: user.id,
            title: values.title,
            author: values.author,
            image_path: imageData.path,
            song_path: songData.path,
         })
         if (supabaseError) {
            setIsLoading(false)
            return toast.error(supabaseError.message)
         }

         router.refresh()
         setIsLoading(false)
         toast.success('Song uploaded successfully.')
         reset()
         uploadModal.onClose()
      } catch (error: any) {
         toast.error('Something happened, try again later.')
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <Modal
         title='Add a song'
         description='Upload an mp3 file to add to your library.'
         isOpen={uploadModal.isOpen}
         onChange={onChange}>
         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
            <Input
               id='title'
               disabled={isLoading}
               {...register('title', { required: true })}
               placeholder='Song title'
            />
            <Input
               id='author'
               disabled={isLoading}
               {...register('author', { required: true })}
               placeholder='Song author'
            />
            <div>
               <div className='pb-1 text-white'>Select a song file</div>
               <Input
                  id='song'
                  type='file'
                  disabled={isLoading}
                  accept='.mp3'
                  className='file:text-white'
                  {...register('song', { required: true })}
               />
            </div>
            <div>
               <div className='pb-1 text-white'>Select a image</div>
               <Input
                  id='image'
                  type='file'
                  disabled={isLoading}
                  accept='image/*'
                  className='file:text-white'
                  {...register('image', { required: true })}
               />
            </div>
            <Button disabled={isLoading} type='submit' className='text-white'>
               Submit
            </Button>
         </form>
      </Modal>
   )
}

export default UploadModal
