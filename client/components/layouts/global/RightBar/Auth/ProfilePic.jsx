import { Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillSetting } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { GiGamepadCross } from "react-icons/gi";
import { IoMdLogOut } from "react-icons/io";
import { MdLocalOffer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../../redux/actions/AuthActions";
import { useEffect } from "react";


const Content = ({user, handleLogout}) => (
    <div className="bg-egor-primary-300 text-white rounded-lg">
      <div className="flex items-center space-x-3 bg-egor-primary-400 px-3 py-2">
        <div className="relative w-[45px] h-[45px] ">
            {/* <Image src={user.profile_image} layout='fill' objectFit='cover' className='rounded-full border border-white' /> */}
            <Image src='/images/profile.png'layout='fill' objectFit='cover' className='rounded-full border border-white' />
        </div>
        <div>
            <p className="font-bold">{user.name}</p>
            <p className="text-xs text-egor-primary-200">Player</p>
        </div>
      </div>
      <div className="border-b border-egor-primary-400">
        <Link href='/profile'>
            <div className="flex items-center space-x-3 py-4 cursor-pointer px-3 hover:bg-egor-primary-400">
                <FaUser size='18px'/>
               <p className="font-semibold">My profile</p>
            </div>
        </Link>
        <Link href='/profile/mycompetitions'>
            <div className="flex items-center space-x-3 py-4 cursor-pointer px-3 hover:bg-egor-primary-400">
                <GiGamepadCross size='18px'/>
               <p className="font-semibold">My Competitions</p>
            </div>
        </Link>
        <Link href='/profile/myoffers'>
            <div className="flex items-center space-x-3 py-4 cursor-pointer px-3 hover:bg-egor-primary-400">
                <MdLocalOffer size='18px'/>
               <p className="font-semibold">My Offers</p>
            </div>
        </Link>
        <Link href='/profile/settings'>
            <div className="flex items-center space-x-3 py-4 cursor-pointer px-3 hover:bg-egor-primary-400">
                <AiFillSetting size='18px'/>
               <p className="font-semibold">Settings</p>
            </div>
        </Link>
      </div>
      <button className="flex items-center space-x-3 py-4 cursor-pointer px-3 hover:bg-egor-primary-400 w-full" onClick={handleLogout}>
            <IoMdLogOut size='18px'/>
            <p className="font-semibold">Logout</p>
      </button>
    </div>
  );

export default function ProfilePic({user}) {
    const dispatch = useDispatch()
    // const router =  useRouter()
    // const isAuth = useSelector(state => state.auth.isAuth)
    const handleLogout = () => {
        dispatch(logout())
        // router.push('/login')
    }
    // useEffect(() => {
    //     if(!isAuth) router.push('/login')
    // }, [isAuth, router]);
  return (
    <div className="">
        <Popover 
            content={() => <Content user={user} handleLogout={handleLogout} />} 
            title=""
            trigger='click'
            overlayClassName="topbar"
            overlayInnerStyle={{background: '#382A47', padding: 0, minWidth: '200px', position: 'relative', left: '-30px', borderRadius: '10px'}}
        >
            <div className="flex items-center space-x-2 cursor-pointer">
                <div className="relative w-[60px] h-[60px]">
                    {/* <Image src={user.profile_image} layout='fill' objectFit='cover' className='rounded-full border border-white' /> */}
                    <Image src='/images/profile.png'layout='fill' objectFit='cover' className='rounded-full border border-white' />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg>
            </div>
        </Popover>
    </div>
  )
}
