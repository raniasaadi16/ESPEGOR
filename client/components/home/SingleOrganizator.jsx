import Image from 'next/image'
import React from 'react'
import {AiFillCheckCircle} from 'react-icons/ai'


export default function SingleOrganizator({item}) {
  return (
    <div className='flex justify-between items-center'>
        <div className='flex space-x-12 items-center'>
            <div className="flex items-center md:space-x-3">
                <div className="relative w-[50px] h-[50px] hidden md:block">
                    <Image src='/images/call.jpg' layout='fill' objectFit='cover' className='rounded-lg' />
                </div>
                <div>
                    <p className='md:text-lg font-semibold'>{item.name}</p>
                    <p className='text-egor-primary-200'>{item.competitions} competitions</p>
                </div>
            </div>
            <AiFillCheckCircle size={25}/>
        </div>
        <button className={`${item.followed ? 'bg-egor-primary-200 text-white' : 'text-egor-primary-200 border border-egor-primary-200'} px-4 py-2 rounded-lg`}>Follow</button>
    </div>
  )
}
