import Link from 'next/link'
import React from 'react'
import SingleOrganizator from './SingleOrganizator'

const items = [
    {
        name: 'organizator name',
        competitions: '2',
        followed: true,
        id: 0
    },
    {
        name: 'organizator name',
        competitions: '2',
        followed: true,
        id: 1
    },
    {
        name: 'organizator name',
        competitions: '2',
        followed: false,
        id: 2
    },
    {
        name: 'organizator name',
        competitions: '2',
        followed: true,
        id: 3
    }
]
export default function Organizators() {
  return (
    <div className='bg-egor-primary-400 rounded-lg px-5 py-3 h-full'>
        <div className="flex justify-between items-center">
            <p className='text-xl md:text-3xl font-bold'>#Trending organizators</p>
            <Link href='/organizators'>View All</Link>
        </div>
        <div className="mt-5 space-y-3">
            {items.map(item => (
                <SingleOrganizator key={item.id} item={item} />
            ))}
        </div>
        
    </div>
  )
}
