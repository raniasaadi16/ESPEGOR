import Image from 'next/image'
import React from 'react'

export default function Header({item}) {
  return (
    <div>
        <div className='bg-egor-primary-400 rounded-lg'>
            <div className="relative w-full h-[300px] rounded-lg">
                <Image src={item.icon} layout='fill' className='rounded-lg' />
                <div className="absolute bottom-0 left-0 w-full py-2 bg-egor-primary-100 px-4 rounded-lg rounded-t-none">
                    <p>Group created by <span className='font-bold'>egorgaming</span></p>
                </div>
            </div>
            <div className="py-6 px-7">
                <div className="flex items-center justify-between">
                    <p className='text-2xl font-bold'>{item.name}</p>
                    <button className='px-6 py-2 bg-egor-primary-100 rounded-lg text-lg font-semibold'>+ Join</button>
                </div>
            </div>
        </div>
    </div>
  )
}
