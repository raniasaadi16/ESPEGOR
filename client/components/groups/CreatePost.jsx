import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CreatePostModal from './CreatePostModal';

export default function CreatePost() {
    const user = useSelector(state => state.auth.user)
    const msg = useSelector(state => state.groups.msg)
    const [open, setopen] = useState(false);

    useEffect(() => {
        if(msg) setopen(false);
    }, [msg]);
  return (
    <div>
        {user && (
            <>
                <div className="flex items-center space-x-3">
                    {user.profile_image && (
                        <Image src={user.profile_image} width={50} height={50} className='rounded-full' />
                    )}
                    <p>{user.name}</p>
                </div>
                <div className="mt-2">
                    <button className="bg-egor-primary-100 w-full py-2 rounded-lg" onClick={() => setopen(true) }>Create New Post</button>
                    <CreatePostModal isOpen={open} setopen={setopen}/>
                </div>
            
            </>
        )}

    </div>
  )
}
