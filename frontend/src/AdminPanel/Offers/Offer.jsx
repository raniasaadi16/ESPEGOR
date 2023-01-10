import React, { useEffect, useState } from 'react'
import { Page } from './Page'
import { Sidebar } from '../Compoments/Sidebar'
import { Form } from './Form';
import axios from 'axios';



export const Offer = () => {
    const [offers, setOffers] = useState([]);
    const [offer, setOffer] = useState(null);
    const [msg, setmsg] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/offer/all`).then(res => {
            const offers = res.data.offers
            setOffers(offers)
        });
    }, [msg]);

    return (
        <div id="offer">
            <Sidebar index={5} />
            <Page offers={offers} SetOffer={setOffer} setmsg={setmsg} />
            <Form msg={msg} setmsg={setmsg} offer={offer} />
        </div>
    );
}
