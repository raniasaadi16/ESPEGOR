import '../../App.css';
import { Navbar } from '../Global Components/navbar';
import { CompetitionCard } from './card';
import { Link } from "react-router-dom";
import { Footer } from '../Global Components/Footer';
import { GameCard } from './GameCard';
import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Carousel from 'nuka-carousel'
// Import Swiper styles
function Upcoming() {

    const [competitions, setCompetitions] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/competition/recent`, {headers: {
            "Access-Control-Allow-Origin": "https://egorgaming.com"
        }}).then(res=>{
            const comps = res.data;
            comps.forEach(element => {
                setCompetitions((list) => [...list, element]);
            });
        });

        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/game/top`, {headers: {
            "Access-Control-Allow-Origin": "https://egorgaming.com"
        }}).then(res=>{
            const gams = res.data;
            gams.forEach(element => {
                setGames((list) => [...list, element]);
            });
        });


    }, []);

    return (
        <div className="g-home">
            <div className="header">
                <Navbar />
                <div style={{marginTop: '37px'}} className='flex items-center'>
                    <Carousel
                        >
                            <img src='./g1.jpg' style={{width: '100%'}} />
                            <img src='./g2.jpg' style={{width: '100%'}} />
                            <img src='./g3.jpg' style={{width: '100%'}} />
                    </Carousel>
                </div>
                
            </div>
          
         
            <Footer />
        </div>
    );
}

export default Upcoming;
