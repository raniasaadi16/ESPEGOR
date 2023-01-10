import React, {useEffect, useState} from 'react'
import {CgSearch} from 'react-icons/cg'
import {AiOutlinePlus} from 'react-icons/ai'
import { Pagination } from '../Compoments/Pagination'
import { CompetitionRecord } from './CompetitionRecord'
import axios from 'axios'

export const Page = (props) => {

    const addCompetition = () => {
        document.getElementById("popup-form").style.display = 'block';
        props.SetCompetition(null);
    };

    


   

    
    return (
        <div className="page">
            <div className="title f-b-c">
                <span>Competitions</span>
                <button className="f-n-c" onClick={addCompetition}><AiOutlinePlus /><span>Add Competition</span></button>
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
                                <th width="140">Title</th>
                                <th width="120">Date</th>
                                <th width="50">Players</th>
                                <th width="60">Max Players</th>
                                <th width="60">Golds</th>
                                <th width="60">Diamonds</th>
                                <th width="90">status</th>
                                <th width="80">Actions</th>
                            </thead>
                            <tbody>
                                {props.competitions.map((item, index) => {
                                    return <CompetitionRecord setmsg={props.setmsg} key={index} data={item} SetCompetition={props.SetCompetition} />;
                                })}
                            </tbody>
                        </table>
                        <div className="competition-pagination">         
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
