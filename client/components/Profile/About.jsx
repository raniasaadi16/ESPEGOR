import React from 'react'

export default function About({user}) {
  return (
    <div>
        <p className="text-2xl font-bold">About</p>
        <div className="text-gray-300 italic text-md font-semibold mt-2">
            <p>email : {user.email}</p>
            <p>phone : {user.phone}</p>
        </div>
        <div className="mt-2 text-xl" dangerouslySetInnerHTML={{__html: `${user.bio}`}}></div>
    </div>
  )
}
