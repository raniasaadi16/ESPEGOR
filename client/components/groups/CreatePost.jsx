import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CreatePostModal from './CreatePostModal';

export default function CreatePost({setdisplayedPosts}) {
    const user = useSelector(state => state.auth.user)
    const msg = useSelector(state => state.groups.msg)
    const [open, setopen] = useState(false);

    useEffect(() => {
        if(msg) {
            setopen(false);

        }
    }, [msg]);
  return (
    <div>
        {user && (
            <div className=" bg-egor-primary-400 px-3 py-2 rounded-lg">
                <div className="flex items-center space-x-3 ">
                    {user.profile_image && (
                        <Image src={user.profile_image} width={30} height={30} className='rounded-full' />
                    )}
                    <div className="flex-1">
                        <button className="bg-egor-primary-300 w-full py-2 rounded-3xl text-start px-4" onClick={() => setopen(true) }>Create New Post ...</button>
                        <CreatePostModal isOpen={open} setopen={setopen}/>
                    </div>
                </div>
            
            </div>
        )}

    </div>
  )
}
