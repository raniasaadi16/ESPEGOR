import '../../App.css';
import { Navbar } from '../Global Components/navbar';
import Element from './element';
import { Footer } from '../Global Components/Footer';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { BuyTokensPopup } from './popup';
import { AiOutlineBank } from 'react-icons/ai';
import { RiBankCard2Line } from 'react-icons/ri';

function Store() {

    const [offers, setOffers] = useState([]);

    const [selectedOffer, setSelectedOffer] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/offer/all`).then((res) => {
            const offersList = res.data.offers;
            offersList.forEach(element => {
                setOffers((list) => [...list, element]); 
            });
        });
    }, []);


    return (
        <div className="store">
            <Navbar />
            <div className="container">
                <h1 className="market">Marketplace</h1>
                <p className="title">You Can Send The Money to : CCP or Paysera</p> <br />
                <p className="descr"><AiOutlineBank /> CCP : 0022454412 <span className="ml-1">75</span></p>
                <p className="descr"><RiBankCard2Line /> Paysera : sheriffe1994@gmail.com</p>
                <p className="descr"><AiOutlineBank /> Paypal : sheriffe1994@gmail.com</p>
                
                <div className="buy-elements">
                    {offers.map((item, index) => {
                        return <Element key={index} data={item} SetSelectedOffer={setSelectedOffer} />
                    })}
                </div>

                <BuyTokensPopup data={selectedOffer}  />
            </div>
            <Footer />
        </div>
    );
}

export default Store;
