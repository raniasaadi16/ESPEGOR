import React from 'react'
import Offer from './Offer'
export default function Offers({offers}) {
  return (
    <div>
        <p className="text-2xl font-bold mx-3">My Transitions : {offers.length}</p>
        <div className="grid grid-cols-3 mt-7">
          {offers && offers.map(item => (
            <Offer key={item.id} item={item} />
          ))}
        </div>
    </div>
  )
}
