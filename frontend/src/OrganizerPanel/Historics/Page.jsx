import React, {useEffect, useState} from 'react'
import {CgSearch} from 'react-icons/cg'
import { Pagination } from '../Compoments/Pagination'
import { CompetitionRecord } from './CompetitionRecord'
import axios from 'axios'

export const Page = (props) => {

    const [competitions, setCompetitions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [showpagination, setShowpagination] = useState(false);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/competition/all?page=${currentPage}`).then(res => {
            const comps = res.data.competitions;
            setPages(parseInt(res.data.pages));
            setShowpagination(true);
            comps.forEach(element => {
                setCompetitions((list) => [...list, element]);
            });
        });

        return () => {
            setCompetitions([]);
        }
    }, [currentPage]);

    
    return (
        <div className="page">
            <div className="title f-b-c">
                <span>Competition Historics</span>
            </div>
            <div className="f-cl background">
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
                            <th width="70">status</th>
                            <th width="60">event</th>
                            <th width="90">Actions</th>
                        </thead>
                        <tbody>
                            {competitions.map((item, index) => {
                                return <CompetitionRecord key={index} data={item} SetCompetition={props.SetCompetition} />;
                            })}
                        </tbody>
                    </table>
                    <div className="competition-pagination">         
                    {
                        (showpagination&&pages>1)&&<Pagination currentPage={currentPage} pages={pages} SetCurrentPage={setCurrentPage} />
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}