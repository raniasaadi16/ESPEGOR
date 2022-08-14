import React, { useEffect, useState } from 'react'
import { Competition } from './Competition'
import API from '../../Services/AuthIntercepteurs';

export const CompetitionsHolder = () => {


    const [competitions, setCompetitions] = useState([]);

    let authPlayerId = 0;

    useEffect(async() => {

        await API.get(`${process.env.REACT_APP_SERVER_END_POINT}/player/auth`).then(res => {
            authPlayerId = (res.data.id);
        });

        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/competition/auth/${authPlayerId}`).then(res=>{
            const competitionsList = res.data;
            competitionsList.forEach(element => {
                setCompetitions((list) => [...list, element]);
            });
        });
    }, []);

    return (
        <div id="competitions">
            {competitions.map((item, index) => {
                return <Competition key={index} data={item} />
            })}    
        </div>
    )
}
