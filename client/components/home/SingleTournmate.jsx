import Image from 'next/image'
import React from 'react'
import {FaMapMarkerAlt, FaUserFriends} from 'react-icons/fa'
import { GiRibbonMedal } from 'react-icons/gi'


export default function SingleTournmate({item}) {
  return (
    <div className='mx-3 '>
        <div className="relative w-full h-[190px]">
            <Image src={item.icon} className='rounded-lg' layout='fill' objectFit='cover'/>
            <div className="absolute top-[12px] tour-bg pl-3 pr-5 py-1.5 ">
                <div className="flex items-center md:space-x-3">
                    <GiRibbonMedal size={25} className='hidden md:block'/>
                    <div className='font-semibold'>
                        <p>{item.organizer}</p>
                        <div className="flex space-x-2">
                            <p className='text-xs'>{item.competition_date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='mt-2'>
            <p className="text-xl font-semibold">{item.name}</p>
            <div className="mt-3 items-center grid grid-cols-2">
                <div className='rounded-full px-4 py-1.5 flex justify-between bg-egor-primary-400'>
                    <div className="flex items-center space-x-2">
                        <div className="relative w-[15px] h-[15px]">
                            <Image src='/images/coin.png' className='rounded-lg' layout='fill' objectFit='cover'/>
                        </div>
                        <p>{item.price_gold}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="relative w-[15px] h-[15px]">
                            <Image src='/images/diamond.png' className='rounded-lg' layout='fill' objectFit='cover'/>
                        </div>
                        <p>{item.price_diamond}</p>
                    </div>
                </div>
                
                <div className="flex space-x-3 text-egor-primary-200 justify-end">
                    <div className="flex space-x-2 items-center">
                        <FaMapMarkerAlt/>
                        <p>{item.location}</p>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <FaUserFriends/>
                        <p>{item.max_players}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
