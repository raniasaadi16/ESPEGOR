import React, { useEffect, useState } from 'react'
import { Page } from './Page'
import { Sidebar } from '../Compoments/Sidebar'
import { Form } from './Form';
import axios from 'axios';

export const Game = () => {

    const [game, setGame] = useState(null);

    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [showpagination, setShowpagination] = useState(false);
    const [msg, setmsg] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/game/paginate?page=${currentPage}`).then(res => {
            const games = res.data.games;
            setPages(parseInt(res.data.pages));
            setShowpagination(true);
            setGames(games)
        });
        return () => {
            setGames([]);
        }
    }, [currentPage, msg]);

    return (
        <div id="game">
            <Sidebar index={2} />
            <Page setmsg={setmsg} SetGame={setGame} games={games} setCurrentPage={setCurrentPage} currentPage={currentPage} pages={pages} showpagination={showpagination} />
            <Form game={game} msg={msg} setmsg={setmsg} />
        </div>
    );
}
