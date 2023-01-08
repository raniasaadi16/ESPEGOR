import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaMapMarkerAlt, FaUserFriends } from 'react-icons/fa'

export default function TopCompetitionSmall({item}) {
  return (
    <div className="relative bg-comp">
        <div className="relative w-full h-[190px]">
            <Image src={item.icon} layout='fill' objectFit="cover" className="rounded-lg" />
        </div>
        <div className="absolute h-full top-0 py-4 left-[25px] z-20 flex flex-col justify-between">
            <div className="rounded-full px-4 py-1.5 flex w-max bg-egor-primary-400 space-x-11 bg-opacity-75">
                <div className="flex space-x-2 items-center">
                    <FaMapMarkerAlt/>
                    <p>{item.location}</p>
                </div>
                <div className="flex space-x-2 items-center">
                    <FaUserFriends/>
                    <p>{item.max_players}</p>
                </div>
            </div>
            <Link href={`/competitions/${item.id}`}>
                <div className='space-y-2 cursor-pointer'>
                    <div className="space-y-1">
                        <p className="text-xl font-bold">{item.name}</p>
                        <p className="text-md italic">{item.competition_date}</p>
                    </div>
                    <div className="space-x-3 flex items-center">
                        <div className="relative w-[20px] h-[20px] rounded-full">
                            <Image src={item.profile_image} fill className="rounded-full"/>
                        </div>
                        <p className="font-semibold">{item.organizer}</p>
                    </div>
                </div>
            </Link>
        </div>
    </div>
  )
}
