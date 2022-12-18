import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiFillHome, AiFillSetting, AiOutlineMenu } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { IoLogoGameControllerB } from 'react-icons/io'
import { RiStore2Fill } from 'react-icons/ri'
import { HiUserGroup } from 'react-icons/hi'
import { GiGamepadCross } from 'react-icons/gi'
import { Button, Drawer, Popover } from 'antd'
import { MdLocalOffer, MdShoppingBasket } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { setActiveMenu } from '../../../redux/actions/UiActions'
import Searchbar from './Searchbar'
import TopBarAuth from './RightBar/Auth/TopBarAuth'
import Topbar from './RightBar/Noauth/Topbar'

const StoreLinks = () => {
    return (
        <div className='bg-egor-primary-400'>
            <Link href='/store/offers'>
                <div className="flex items-center space-x-3 cursor-pointer py-2 px-7 hover:bg-egor-primary-500">
                    <MdLocalOffer className='text-white'/>
                    <p className='text-white font-bold'>Offers</p>
                </div>
            </Link>
            <Link href='/store/marketplace'>
                <div className="flex items-center space-x-3 cursor-pointer py-2 px-7 hover:bg-egor-primary-500">
                    <MdShoppingBasket className='text-white'/>
                    <p className='text-white font-bold'>Marketplace</p>
                </div>
            </Link>
        </div>
    )
}

const ProfileLinks = () => {
    return (
        <div className='bg-egor-primary-400'>
            <Link href='/profile'>
            <div className="flex items-center space-x-3 py-2 cursor-pointer px-7 hover:bg-egor-primary-500">
                <FaUser className='text-white'/>
               <p className="font-bold text-white">My profile</p>
            </div>
            </Link>
            <Link href='/profile/mycompetitions'>
                <div className="flex items-center space-x-3 py-2 cursor-pointer px-7 hover:bg-egor-primary-500">
                    <GiGamepadCross className='text-white'/>
                <p className="font-bold text-white">My Competitions</p>
                </div>
            </Link>
            <Link href='/profile/myoffers'>
                <div className="flex items-center space-x-3 py-2 cursor-pointer px-7 hover:bg-egor-primary-500">
                    <MdLocalOffer className='text-white'/>
                <p className="font-bold text-white">My Offers</p>
                </div>
            </Link>
            <Link href='/profile/settings'>
                <div className="flex items-center space-x-3 py-2 cursor-pointer px-7 hover:bg-egor-primary-500">
                    <AiFillSetting className='text-white'/>
                <p className="font-bold text-white">Settings</p>
                </div>
            </Link>
        </div>
    )
}


export default function Sidebar() {
    const active = useSelector(state => state.ui.activeMenu)
    const authData = useSelector(state => state.auth)
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    }

  return (
    <div className='md:rounded-lg bg-egor-primary-400 fixed left-0 mx-auto md:mx-0 right-0 px-3 md:px-0 w-full md:w-auto z-20 bottom-0 md:relative'>
        <div className="relative px-3 py-4 w-[85px] h-[68px] mx-auto hidden md:block">
            <Image src='/images/20220824_152035.png' layout='fill' />
        </div>
        <div className="md:mt-4 flex justify-between items-center md:block">
            <Link href='/'>
                <div className={`${active === 'Home' ? 'md:bg-egor-primary-100 md:text-white text-egor-primary-100 md:rounded-full rounded-tl-none rounded-bl-none' : 'md:hover:bg-egor-primary-500 md:hover:text-white hover:text-egor-primary-100'} space-y-1.5 py-5 md:py-3 md:px-2 px-4 md:hover:rounded-full hover:rounded-tl-none hover:rounded-bl-none cursor-pointer`}>
                    <AiFillHome className='mx-auto ' size='20px'/>
                    <p className='text-center font-semibold hidden md:block'>Home</p>
                </div>
            </Link>
            <Popover
                content={() => <ProfileLinks />} 
                title=""
                trigger='hover'
                overlayClassName="topbar"
                placement= 'right'
            >
                <div className={`${active === 'profile' ? 'md:bg-egor-primary-100 md:text-white text-egor-primary-100 md:rounded-full rounded-tl-none rounded-bl-none' : 'md:hover:bg-egor-primary-500 md:hover:text-white hover:text-egor-primary-100'} space-y-1.5 py-5 md:py-3 md:px-2 px-4 md:hover:rounded-full hover:rounded-tl-none hover:rounded-bl-none cursor-pointer`}>
                    <FaUser className='mx-auto ' size='20px'/>
                    <p className='text-center font-semibold hidden md:block'>Profile</p>
                </div>
            </Popover>
            <Link href='/games'>
                <div className={`${active === 'games' ? 'md:bg-egor-primary-100 md:text-white text-egor-primary-100 md:rounded-full rounded-tl-none rounded-bl-none' : 'md:hover:bg-egor-primary-500 md:hover:text-white hover:text-egor-primary-100'} space-y-1.5 py-5 md:py-3 md:px-2 px-4 md:hover:rounded-full hover:rounded-tl-none hover:rounded-bl-none cursor-pointer`}>
                    <IoLogoGameControllerB className='mx-auto ' size='20px'/>
                    <p className='text-center font-semibold hidden md:block'>Games</p>
                </div>
            </Link>
            <Link href='/competitions'>
                <div className={`${active === 'competitions' ? 'md:bg-egor-primary-100 md:text-white text-egor-primary-100 md:rounded-full rounded-tl-none rounded-bl-none' : 'md:hover:bg-egor-primary-500 md:hover:text-white hover:text-egor-primary-100'} space-y-1.5 py-5 md:py-3 md:px-2 px-4 md:hover:rounded-full hover:rounded-tl-none hover:rounded-bl-none cursor-pointer`}>
                    <GiGamepadCross className='mx-auto ' size='20px'/>
                    <p className='text-center font-semibold hidden md:block'>Competitions</p>
                </div>
            </Link>
            <Link href='/community'>
                <div className={`${active === 'community' ? 'md:bg-egor-primary-100 md:text-white text-egor-primary-100 md:rounded-full rounded-tl-none rounded-bl-none' : 'md:hover:bg-egor-primary-500 md:hover:text-white hover:text-egor-primary-100'} space-y-1.5 py-5 md:py-3 md:px-2 px-4 md:hover:rounded-full hover:rounded-tl-none hover:rounded-bl-none cursor-pointer`}>
                    <HiUserGroup className='mx-auto ' size='20px'/>
                    <p className='text-center font-semibold hidden md:block'>Community</p>
                </div>
            </Link>
            <Popover
                content={() => <StoreLinks />} 
                title=""
                trigger='hover'
                overlayClassName="topbar"
                placement= 'right'
            >
                <div className={`${active === 'store' ? 'md:bg-egor-primary-100 md:text-white text-egor-primary-100 md:rounded-full rounded-tl-none rounded-bl-none' : 'md:hover:bg-egor-primary-500 md:hover:text-white hover:text-egor-primary-100'} space-y-1.5 py-5 md:py-3 md:px-2 px-4 md:hover:rounded-full hover:rounded-tl-none hover:rounded-bl-none cursor-pointer`}>
                    <RiStore2Fill className='mx-auto ' size='20px'/>
                    <p className='text-center font-semibold hidden md:block'>Store</p>
                </div>
            </Popover>
            <div className='md:hidden '>
                <button onClick={showDrawer}>
                    <AiOutlineMenu size='20px'/>
                </button>
                <Drawer placement="left" onClose={onClose} open={open} drawerStyle={{background: '#382A47'}} closable={false} className='main-drawer' title={<div className="relative w-[85px] h-[68px] md:hidden">
                <Image src='/images/20220824_152035.png' layout='fill' />
                 </div>}>
                    <Searchbar/>
                    <div className="mt-3">
                        {authData.isAuth ? <TopBarAuth user={authData.user} /> : <Topbar/>}
                    </div>
                </Drawer>
            </div>
        </div>
    </div>
  )
}
