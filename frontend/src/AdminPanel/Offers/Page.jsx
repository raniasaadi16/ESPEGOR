import React, {useEffect, useState} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import { DealOffer } from './DealOffer'
import axios from 'axios'


export const Page = (props) => {
    
    const [offers, setOffers] = useState([]);

    const addOffer = () => {
        document.getElementById("popup-form").style.display = 'block';
        props.SetOffer(null);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/offer/all`).then(res => {
            const offers = res.data.offers
            offers.forEach(element => {
                setOffers((list) => [...list, element]);
            });
        });
    }, []);

    return (
        <div className="page">
            <div className="title f-b-c">
                <span>Offers</span>
                <button className="f-n-c" onClick={addOffer}><AiOutlinePlus /><span>Add Offer</span></button>
            </div>
            <div className="offer-holder">
                <div className="wrapper">
                    {offers.map((item, index) => {
                        return <DealOffer key={index} data={item} SetOffer={props.SetOffer} />;
                    })}
                </div>
            </div>
        </div>
    );
}
