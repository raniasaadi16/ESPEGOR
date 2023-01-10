import React, { useEffect, useState } from 'react'
import { Page } from './Page'
import { Sidebar } from '../Compoments/Sidebar'
import { Form } from './Form'
import axios from 'axios'

export const Competition = () => {

    const [competiton, setCompetition] = useState(null);
    const [competitions, setCompetitions] = useState([]);
    const [pages, setPages] = useState(1);
    const [showpagination, setShowpagination] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [msg, setmsg] = useState('');


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/competition/all?page=${currentPage}`).then(res => {
            const comps = res.data.competitions;
            setPages(parseInt(res.data.pages));
            setShowpagination(true);
            setCompetitions(comps);
          
        });

        return () => {
            setCompetitions([]);
        }
    }, [currentPage, msg]);

    return (
        <div id="competition">
            <Sidebar index={1} />
            <Page SetCompetition={setCompetition} currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} showpagination={showpagination} setCompetitions={setCompetitions} competitions={competitions} setmsg={setmsg} />
            <Form msg={msg} setmsg={setmsg} setCompetitions={setCompetitions} competiton={competiton} />
        </div>
    )
}
