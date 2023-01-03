import React, { useState } from 'react'
import { Page } from './Page'
import { Sidebar } from '../Compoments/Sidebar'
import { Form } from './Form';



export const Offer = () => {

    const [offer, setOffer] = useState(null);

    return (
        <div id="offer">
            <Sidebar index={5} />
            <Page SetOffer = {setOffer} />
            <Form offer={offer} />
        </div>
    );
}
