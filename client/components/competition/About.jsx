import React from 'react'

export default function About({item}) {
  return (
    <div>
        <div className="space-y-2 text-lg">
            <div className="flex items-center space-x-3">
                <p>Game :  {item.game_name}</p>
            </div>
            <div className="flex items-center space-x-3">
                <p>Player Joined :  {item.player_joined}</p>
            </div>
            <div className="flex items-center space-x-3">
                <p>Players required :  {item.max_players}</p>
            </div>
        </div>
        <p className="text-lg font-bold italic mt-4">About the competition: </p>
        <div dangerouslySetInnerHTML={{ __html: item.description }} className='mt-2 mb-2.5 text-gray-300 text-lg font-normal' />
    </div>
  )
}
