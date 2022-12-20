import Image from 'next/image'
import React from 'react'
import { FaMapMarkerAlt, FaUserFriends } from 'react-icons/fa'

export default function Header({item}) {

    //join
    //update user wallet
  return (
    <div className="relative bg-comp">
        <div className="relative w-full h-[400px] rounded-lg ">
            <Image src={item.icon} layout='fill' objectFit="cover" className="rounded-lg" />
        </div>
        <div className="absolute h-full top-0 py-5 left-[25px] z-20 flex flex-col justify-between">
                <div className="rounded-full px-4 py-1.5 w-max bg-egor-primary-400 bg-opacity-75">
                    <div className="flex space-x-2 items-center">
                        <FaMapMarkerAlt/>
                        <p>{item.location}</p>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="space-y-.5">
                        <p className="text-4xl font-bold">{item.name}</p>
                        <p className="text-lg italic">{item.competition_date}</p>
                    </div>
                    <div className="flex space-x-7 items-center">
                        {
                            item.joined ? (
                                <button className='py-2 px-10 rounded-lg bg-egor-primary-400 text-white text-lg font-semibold italic cursor-not-allowed'>Already Joined</button>
                            )
                            :
                            (
                                <button className='py-2 px-10 rounded-lg bg-egor-primary-100 text-white text-lg font-semibold'>JOIN</button>
                            )
                        }
                        <div className='rounded-full px-4 py-1.5 flex space-x-7 w-max'>
                            <div className="flex items-center space-x-2">
                                <div className="relative w-[25px] h-[25px]">
                                    <Image src='/images/coin.png' className='rounded-lg' layout='fill' objectFit='cover'/>
                                </div>
                                <p className='text-lg'>{item.price_gold}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="relative w-[25px] h-[25px]">
                                    <Image src='/images/diamond.png' className='rounded-lg' layout='fill' objectFit='cover'/>
                                </div>
                                <p className='text-lg'>{item.price_diamond}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}