import React, {useState, useEffect} from 'react'
import {CgSearch} from 'react-icons/cg'
import {AiOutlinePlus} from 'react-icons/ai'
import { Pagination } from '../Compoments/Pagination'
import { GameRecord } from './GameRecord'

import axios from 'axios'

export const Page = (props) => {

    const addGame = () => {
        document.getElementById("popup-form").style.display = 'block';
        props.SetGame(null);
    };

    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [showpagination, setShowpagination] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/game/paginate?page=${currentPage}`).then(res => {
            const games = res.data.games;
            setPages(parseInt(res.data.pages));
            setShowpagination(true);
            games.forEach(element => {
                setGames((list) => [...list, element]);
            });
        });
        return () => {
            setGames([]);
        }
    }, [currentPage]);


    return (
        <div className="page">
            <div className="title f-b-c">
                <span>Games</span>
                <button className="f-n-c" onClick={addGame}><AiOutlinePlus /><span>Add Game</span></button>
            </div>
            <div className="table-table">
                <div className="f-cl">
                    <div className="c-top">
                        <form className="f-n-c">
                            <input type="text" name="search" id="search" placeholder="Search" />
                            <button className="f-c-c"><CgSearch /></button>
                        </form>
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <th width="35">ID</th>
                                <th width="100">Name</th>
                                <th width="50">Competitions</th>
                                <th width="90">status</th>
                                <th width="100">Created at</th>
                                <th width="50"></th>
                            </thead>
                            <tbody>
                                {games.map((item, index) => {
                                    return <GameRecord key={index} data={item} SetGame={props.SetGame} />;
                                })}
                            </tbody>
                        </table>
                        <div className="game-pagination">      
                                {
                                    (showpagination&&pages>1)&&<Pagination currentPage={currentPage} pages={pages} SetCurrentPage={setCurrentPage} />
                                }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
