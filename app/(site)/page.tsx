import getSongs from '@/actions/get-songs'

import Header from '@/components/header'
import ListItem from '@/components/list-item'
import PageContent from './components/page-content'

// up to date data
export const revalidate = 0

export default async function Home() {
   // get all songs
   const songs = await getSongs()

   return (
      <section className='w-full h-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900'>
         <Header>
            <div className='mb-2'>
               <h1 className='text-3xl font-semibold text-white'>Welcome Back</h1>
               <div className='grid grid-cols-1 gap-3 mt-4 sm:grid-cols-1 xl:grid-cols-3'>
                  <ListItem image='/images/liked.png' name='Liked Song' href='liked' />
               </div>
            </div>
         </Header>
         <div className='px-6 mt-2 mb-7'>
            <div className='flex items-center justify-between'>
               <h1 className='text-2xl font-semibold text-white'>Newest Song</h1>
            </div>
            <PageContent songs={songs} />
         </div>
      </section>
   )
}
