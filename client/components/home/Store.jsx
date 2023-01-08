import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Store() {
  return (
    <div className="relative">
        <div className="relative w-full h-[390px] rounded-lg header-bg">
        <Image src='/images/200x300.jpg' layout="fill" className="rounded-lg" />
        </div>
        <div className="absolute top-[60%] left-[20px] w-2/3">
        <p className="text-2xl mt-2 font-semibold">
            Check the best offers in our store !
        </p>
        <div className="mt-5">
            <Link href='/store/offers'>
            <p className="bg-egor-red px-8 py-2.5 rounded-lg text-lg text-center font-semibold hover:text-white">
                Store
            </p>
            </Link>
        </div>
        </div>
  </div>
  )
}
