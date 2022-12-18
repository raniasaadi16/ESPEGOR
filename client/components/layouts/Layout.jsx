import React, { useEffect, useState } from 'react'
import Sidebar from './global/Sidebar'
import Searchbar from './global/Searchbar'
import Chat from './global/chat'
import Topbar from './global/RightBar/Noauth/Topbar'
import { useSelector } from 'react-redux'
import TopBarAuth from './global/RightBar/Auth/TopBarAuth'
import Image from 'next/image'
import { Button, Drawer } from 'antd'


export default function Layout({children}) {
    const authData = useSelector(state => state.auth)
    
   
  return (
    <div className='md:flex p-5 md:space-x-7'>
        <Sidebar/>
        <div className='md:space-y-5 flex-1'>
            <div className='flex justify-between items-center pr-7'>
                <div className="relative w-[85px] h-[68px] md:hidden">
                    <Image src='/images/20220824_152035.png' layout='fill' />
                </div>
                
                <div className='hidden md:block'>
                    <Searchbar/>
                </div>
                <div className="hidden md:block">
                    {authData.isAuth ? <TopBarAuth user={authData.user} /> : <Topbar/>}
                </div>
            </div>
            <div className='flex md:space-x-7'>
                <div className='flex-1 w-full mb-14 md:mb-0'>
                    {children}
                </div>
                <Chat/>
            </div>
        </div>
    </div>
  )
}
