import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const CompetitionTable = () => {

    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/admin/dashboard/competitions`).then( res => {
            const comps = res.data;
            console.log(comps)
            comps.forEach(element => {
                setCompetitions(list => [...list, element]);
            });
        });
    }, []);

    return (
        <div className="competition-table">
            <div className="t-top f-b-c">
                <p>Upcoming Competitions</p>
                <span>Show More</span>
            </div>
            <div className="table">
                <table>
                    <thead>
                        <th width="70">ID</th>
                        <th width="140">Title</th>
                        <th width="130">Date</th>
                    </thead>
                    <tbody>
                       {competitions.map((item, index) => {
                           return <tr key={index}>
                                <td>U-{item.id}</td>
                                <td className="c-name f-n-c"><img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/competitions/` + item.icon} alt="" width="18" /><span>{item.name}</span></td>
                                <td>{item.competition_date}</td>
                            </tr>
                       })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
