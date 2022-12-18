import Image from 'next/image'
import React from 'react'

export default function Wallet({user}) {
  return (
    <div>
        <div className='rounded-full px-5 py-2.5 flex space-x-12 bg-egor-primary-400 items-center'>
            <div className="flex items-center space-x-2">
                <div className="relative w-[20px] h-[20px]">
                    <Image src='/images/coin.png' className='rounded-lg' layout='fill' objectFit='cover'/>
                </div>
                <p>{user.golds}</p>
            </div>
            <div className="flex users-center space-x-2">
                <div className="relative w-[20px] h-[20px]">
                    <Image src='/images/diamond.png' className='rounded-lg' layout='fill' objectFit='cover'/>
                </div>
                <p>{user.diamonds}</p>
            </div>
        </div>
    </div>
  )
}
