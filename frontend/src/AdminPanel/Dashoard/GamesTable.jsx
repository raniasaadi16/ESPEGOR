import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const GamesTable = () => {

    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/admin/dashboard/games`).then( res => {
            const games = res.data;
            games.forEach(element => {
                setGames(list => [...list, element]);
            });
        });
    }, []);

    return (
        <div className="competition-table">
            <div className="t-top f-b-c">
                <p>Top Games</p>
                <span>Show More</span>
            </div>
            <div className="table">
                <table>
                    <thead>
                        <th width="50">ID</th>
                        <th width="100">Name</th>
                        <th width="35">Comps</th>
                        <th width="40">Status</th>
                    </thead>
                    <tbody>
                        {games.map((item, index) => {
                            return <tr key={index}>
                                <td>G-{item.id}</td>
                                <td className="c-name f-n-c"><img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/games/`+item.icon} alt="" width="18" /><span>{item.name}</span></td>
                                <td>{item.comps}</td>
                                <td>{item.game_status===0?"Pending":item.game_status===1?"Inactive":"Active"}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
