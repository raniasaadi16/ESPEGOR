import Link from 'next/link'
import React from 'react'
import SingleOrganizator from './SingleOrganizator'

const items = [
    {
        name: 'egorgaming',
        competitions: '2',
        followed: true,
        id: 0
    },
    {
        name: 'egorgaming',
        competitions: '2',
        followed: true,
        id: 1
    },
    {
        name: 'egorgaming',
        competitions: '2',
        followed: false,
        id: 2
    },
    {
        name: 'egorgaming',
        competitions: '2',
        followed: true,
        id: 3
    }
]
export default function Organizators() {
  return (
    <div className='bg-egor-primary-400 rounded-lg px-5 py-3 h-full flex flex-col relative'>
        <div className="flex justify-between items-center">
            <p className='text-xl md:text-3xl font-bold'>#Trending organizators</p>
            {/* <Link href='/organizators'>View All</Link> */}
        </div>
        <div className="mt-5 space-y-3 flex-1" style={{filter: 'blur(3px)'}}>
            {items.map(item => (
                <SingleOrganizator key={item.id} item={item} />
            ))}
        </div>
        <div className='absolute top-[50%] w-full mx-auto block text-center'>
            <p className="text-4xl font-xtrabold italic">Comming soon</p>
        </div>
    </div>
  )
}
