import '../../App.css';
import { Navbar } from '../Global Components/navbar';
import Element from './element';
import { Footer } from '../Global Components/Footer';

import axios from 'axios';
import { useEffect, useState } from 'react';

function Games() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/game/all`).then((res) => {
            const gamesList = res.data.games;

            gamesList.forEach(element => {
                if(element.game_status !== 0){
                    setGames((list) => [...list, element]); 
                }
            });
        });
    }, []);


    return (
        <div className="store">
            <Navbar />
            <div className="container">
                <h1 className="market">Available Games</h1>
                <p className="descr">Some Games Will Be Added Soon</p> <br />
                
                <div className="buy-elements">
                    {games.map((item, index) => {
                        return <Element key={index} data={item} />
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Games;
