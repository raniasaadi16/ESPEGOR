import '../../App.css';
import { Navbar } from '../Global Components/navbar';
import Element from './element';
import { Footer } from '../Global Components/Footer';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Pagination } from '../../GamerPanel/Compoments/Pagination';
import { NoData } from "../../GamerPanel/profile/NoData";

function Competitions() {

    const [competitions, setCompetitions] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [showpagination, setShowpagination] = useState(false);

    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState('');

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

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/competition/all?page=${currentPage}&game_id=${selectedGame}`).then(res => {
            
            const competitionsList = res.data.competitions;
            setPages(parseInt(res.data.pages));
            setShowpagination(true);

            competitionsList.forEach(element => {
                setCompetitions((list) => [...list, element]); 
            });
        });
                    
        return () => {
            setCompetitions([]);
        }

    }, [currentPage, selectedGame]);


    const SetSelectedGame = (value) => {
        setSelectedGame(value);
    }

    return (
        <div className="store">
            <Navbar />
            <div className="container">
                <h1 className="market">Available Competitions</h1>
                <p className="descr">Some Competitions Will Be Added Soon</p> <br />
                <br />
                <div className="games-ava f-c-c">
                    <div className="wrapper">
                        <button 
                            onClick={() => SetSelectedGame('')}
                            className={''===selectedGame&&'gg-active'}
                        >All Games</button>
                        {games.map((item, index) => {
                            return <button key={index} onClick={() => SetSelectedGame(item.id)} className={item.id===selectedGame&&'gg-active'}>{item.name}</button>
                        })}
                    </div>
                </div>

                <div className="buy-elements">
                    {competitions.length > 0 ? competitions.map((item, index) => {
                        return <Element key={index} data={item} />
                    }) : <NoData msg="No Competitions Is Available At The Moment" />}
                </div>
                <div className="competition-pagination f-c-c">         
                {
                    (showpagination&&pages>1)&&<Pagination currentPage={currentPage} pages={pages} SetCurrentPage={setCurrentPage} />
                }
                </div>
                <br /><br /><br />
            </div>
            <Footer />
        </div>
    );
}

export default Competitions;
