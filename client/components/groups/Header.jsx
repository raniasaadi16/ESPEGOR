import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { joinGroup } from '../../redux/actions/GroupsActions';
import Cookies from 'universal-cookie';

export default function Header({item}) {
    const joind = useSelector(state => state.groups.group)?.joind
    const dispatch = useDispatch()
    const handleJoin = () => {
        const cookies = new Cookies();
        const formData = new FormData;
        formData.append('id', item.id)
        dispatch(joinGroup(cookies.get('auth_token'), item.id))
    }
   
  return (
    <div className='rounded-lg'>
        <div className="relative w-full h-[400px]">
            <Image src={item.icon} fill className='rounded-b-lg' />
            <div className="absolute bottom-0 left-0 w-full py-2 bg-egor-primary-100 px-4 rounded-lg rounded-t-none">
                <p>Group created by <span className='font-bold'>egorgaming</span></p>
            </div>
        </div>
        <div className="py-6 px-7">
            <div className="flex items-center justify-between">
                <p className='text-2xl font-bold'>{item.name}</p>
                {joind ? <button className='px-6 py-2 bg-egor-primary-500 rounded-lg text-lg font-semibold italic cursor-not-allowed'>Already Joined</button> : (
                    <button className='px-6 py-2 bg-egor-primary-100 rounded-lg text-lg font-semibold' onClick={handleJoin}>+ Join</button>
                )}
            </div>
        </div>
    </div>
  )
}
