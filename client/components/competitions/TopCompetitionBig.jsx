import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaMapMarkerAlt, FaUserFriends } from 'react-icons/fa'

export default function TopCompetitionBig({item}) {
  return (
    <div className="relative bg-comp">
        <div className="relative w-full h-full min-h-[350px] rounded-lg ">
            <Image src={item.icon} layout='fill' objectFit="cover" className="rounded-lg" />
        </div>
        <div className="absolute h-full top-0 py-7 left-[25px] z-20 flex flex-col justify-between">
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
                <div className="space-y-2.5">
                    <div className="space-y-1">
                        <p className="text-4xl font-bold">{item.name}</p>
                        <p className="text-lg italic">{item.competition_date}</p>
                    </div>
                    <div className="space-x-3 flex items-center">
                            <div className="relative w-[35px] h-[35px] rounded-full">
                                <Image src={item.profile_image} fill className="rounded-full"/>
                            </div>
                        <p className="text-lg font-semibold">{item.organizer}</p>
                    </div>
                    <div>
                        <Link href={`/competitions/${item.id}`}>
                            <p className="bg-egor-red px-11 py-2 rounded-lg text-lg font-semibold hover:text-white block w-max">
                                Check it
                            </p>
                        </Link>
                    </div>
                </div>
        </div>
    </div>
)
}
