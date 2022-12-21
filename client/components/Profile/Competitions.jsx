import React from 'react'
import SingleTournmate from '../home/SingleTournmate'

export default function Competitions({comps}) {
 
  return (
    <div>
        <p className="text-2xl font-bold mx-3">My competitions : {comps.length}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 mt-7">
          {comps && comps.map(item => (
            <SingleTournmate key={item.id} item={item} />
          ))}
        </div>
    </div>
  )
}
