import React, {useState, useEffect} from 'react'
import {CgSearch} from 'react-icons/cg'
import {AiOutlinePlus} from 'react-icons/ai'
import { Pagination } from '../Compoments/Pagination'
import { GameRecord } from './GameRecord'


export const Page = (props) => {

    const addGame = () => {
        document.getElementById("popup-form").style.display = 'block';
        props.SetGame(null);
    };



 


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
                                {props.games.map((item, index) => {
                                    return <GameRecord setmsg={props.setmsg} key={index} data={item} SetGame={props.SetGame} />;
                                })}
                            </tbody>
                        </table>
                        <div className="game-pagination">      
                                {
                                    (props.showpagination&&props.pages>1)&&<Pagination currentPage={props.currentPage} pages={props.pages} SetCurrentPage={props.setCurrentPage} />
                                }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
