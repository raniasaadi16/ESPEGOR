import React, { useEffect, useState } from 'react'
import {CgSearch} from 'react-icons/cg'
import { Pagination } from '../Compoments/Pagination';
import { PlayerRecord } from './PlayerRecord';
import axios from 'axios';

export const Page = (props) => {
    const [players, setPlayers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [showpagination, setShowpagination] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/player/all?page=${currentPage}`).then(res => {
            const players = res.data.players;
            setPages(parseInt(res.data.pages));
            setShowpagination(true);
            players.forEach(element => {
                setPlayers((list) => [...list, element]);
            });
        });
        return () => {
            setPlayers([]);
        }
    }, [currentPage]);

    return (
        <div className="page">
            <div className="title f-b-c">
                <span>Players</span>
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
                                <th width="50">ID</th>
                                <th width="120">Name</th>
                                <th width="120">Email</th>
                                <th width="90">Joined at</th>
                                <th width="50">Golds</th>
                                <th width="50">Diamonds</th>
                                <th width="40">Competitions</th>
                                <th width="60"></th>
                            </thead>
                            <tbody>
                                {players.map((item, index) => {
                                    return <PlayerRecord key={index} data={item} SetPlayer={props.SetPlayer} />;
                                })}
                            </tbody>
                        </table>
                        <div className="player-pagination">         
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
