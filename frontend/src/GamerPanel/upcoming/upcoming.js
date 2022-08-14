import '../../App.css';
import { Navbar } from '../Global Components/navbar';
import { CompetitionCard } from './card';
import { Link } from "react-router-dom";
import { Footer } from '../Global Components/Footer';
import { GameCard } from './GameCard';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import API from '../../Services/AuthIntercepteurs';

function Upcoming() {

    const [competitions, setCompetitions] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/competition/recent`, {headers: {
            "Access-Control-Allow-Origin": "*"
        }}).then(res=>{
            const comps = res.data;
            comps.forEach(element => {
                setCompetitions((list) => [...list, element]);
            });
        });

        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/game/top`, {headers: {
            "Access-Control-Allow-Origin": "*"
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
                <div className="header-content">
                    <img src="./../introimage.png" alt="" className="img" />
                    <div className="right-side">
                        <div className="text f-cl">
                            <h1 className="society-name">EGOR TECH</h1>
                            <p className="quotes">
                                Predict the future, <br/>
                                to live the past
                                with us on the present</p>
                        </div>
                        <div className="f gap10">
                            <Link to="/store"><button className="btn">Go To Market</button></Link>
                            <Link to="/competitions"><button className="btn">Check Out Competitions </button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="upcoming">
                <h2 className="title">Upcoming Tournaments</h2>
                <p className="top-head-p">Once You Joined any Competition the Dianonds and Coins required to join will be reduced fron your balance and you won't be able to cancel it</p>
                <div className="categories">                    
                    {competitions.map((item, index) => {
                        return <CompetitionCard key={index} data={item} />;
                    })}  
                </div>
            </div>
            <div className="games">
                <h2 className="title">Games Available</h2>
                <p className="top-head-p">There is always more games coming soon to this platform</p>
                <div className="categories">
                    {games.map((item, index) => {
                        return <GameCard key={index} data={item} />;
                    })}  
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Upcoming;
