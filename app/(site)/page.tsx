import Header from '@/components/header'
import ListItem from '@/components/list-item'

export default function Home() {
   return (
      <section className='w-full h-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900'>
         <Header>
            <div className='mb-2'>
               <h1 className='text-3xl font-semibold text-white'>Welcome Back</h1>
               <div className='mt-4 grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 gap-3'>
                  <ListItem image='/images/liked.png' name='Liked Song' href='liked' />
               </div>
            </div>
         </Header>
         <div className='px-6 mt-2 mb-7'>
            <div className='flex items-center justify-between'>
               <h1 className='text-2xl font-semibold text-white'>Newest Song</h1>
            </div>
            <div className='text-white'>List Of Songs!</div>
         </div>
      </section>
   )
}
