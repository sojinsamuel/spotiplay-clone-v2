'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'

import Box from './box'
import SidebarItem from './sidebar-item'
import Library from './library'

interface ISidebarProps {
   children?: React.ReactNode
}

const Sidebar: React.FC<ISidebarProps> = ({ children }) => {
   const pathname = usePathname()

   const routes = useMemo(
      () => [
         { icon: HiHome, label: 'Home', active: pathname !== '/active', href: '/' },
         {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search',
         },
      ],
      [pathname]
   )

   return (
      <div className='flex h-full'>
         <div className='hidden md:flex flex-col gap-y-2 bg-black text-white h-full w-[300px] p-2'>
            <Box>
               <div className='flex flex-col h-full px-5 py-4 gap-y-4'>
                  {routes.map((item) => (
                     <SidebarItem key={item.label} {...item} />
                  ))}
               </div>
            </Box>
            <Box className='h-full overflow-y-auto'>
               <Library />
            </Box>
         </div>
         {/* main content */}
         <main className='flex-1 h-full py-2 overflow-y-auto'>{children}</main>
      </div>
   )
}

export default Sidebar
