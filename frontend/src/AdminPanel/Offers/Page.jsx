import React, {useEffect, useState} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import { DealOffer } from './DealOffer'


export const Page = (props) => {
    

    const addOffer = () => {
        document.getElementById("popup-form").style.display = 'block';
        props.SetOffer(null);
    };

    

    return (
        <div className="page">
            <div className="title f-b-c">
                <span>Offers</span>
                <button className="f-n-c" onClick={addOffer}><AiOutlinePlus /><span>Add Offer</span></button>
            </div>
            <div className="offer-holder">
                <div className="wrapper">
                    {props.offers.map((item, index) => {
                        return <DealOffer setmsg={props.setmsg} key={index} data={item} SetOffer={props.SetOffer} />;
                    })}
                </div>
            </div>
        </div>
    );
}
