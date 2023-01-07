import Image from 'next/image'
import React from 'react'

export default function SinglePost({ item }) {
  return (
    <div className='bg-egor-primary-400 rounded-lg'>
        <div className="px-3 py-2">
            <div className="items-center flex space-x-3 ">
                <Image src={item.profile_image} width={40} height={40} className='rounded-full' />
                <div className='text-sm'>
                    <p className='font-semibold'>{item.name}</p>
                    <p className='text-gray-300 text-xs'>created {item.created_at}</p>
                </div>
            </div>
            {item.title && (
                <p className='mt-2'>{item.title}</p>
            )}
        </div>
        {item.path && (
            <div className="relative w-full h-[400px]">
                <Image src={item.path} fill/>
            </div>
        )}
    </div>
  )
}
