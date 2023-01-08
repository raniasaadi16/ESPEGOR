import React, { useState } from 'react'
import SeeMembers from './SeeMembers';

export default function About({ item }) {
  const [open, setopen] = useState(false);
  const handleMembers = () =>{
    setopen(true)
  }
  return (
    <div>
        <p className='font-semibold'>About the Group:</p>
        <div dangerouslySetInnerHTML={{ __html: item.description }} className='mt-2 mb-2.5 text-gray-300 ' />
        <div className="space-y-1">
          <p className='font-bold'>Number of posts: <span className='font-normal text-gray-300'>{item.posts_count}</span></p>
          <p className='font-bold'>Number of members: <span className='font-normal text-gray-300'>{item.members_count}</span></p>
        </div>
        {item.members_count > 0 && (
          <>
            <button className='w-full py-1.5 bg-egor-primary-500 italic mt-2.5 font-semibold rounded' onClick={handleMembers}>See all members</button>
            <SeeMembers isOpen={open} setopen={setopen} id={item.id} />
          </>
        )}
        
    </div>
  )
}
