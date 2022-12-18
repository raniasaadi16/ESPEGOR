import React from 'react'
import ProfilePic from './ProfilePic'
import Wallet from './Wallet'

export default function TopBarAuth({user}) {
  return (
    <div className='flex items-center space-x-11'>
        <Wallet user={user} />
        <ProfilePic user={user} />
    </div>
  )
}
