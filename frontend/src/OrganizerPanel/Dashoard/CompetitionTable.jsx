import React from 'react'
import { Link } from 'react-router-dom';

export const CompetitionTable = () => {

    return (
        <div className="competition-table">
            <div className="t-top f-b-c">
                <p>Your Competitions</p>
                <span>Show Your Competitions</span>
            </div>
            <div className="table">
                <table>
                    <thead>
                        <th width="60">ID</th>
                        <th width="140">Title</th>
                        <th width="120">Date</th>
                        <th width="50">Players</th>
                        <th width="70">Max Players</th>
                        <th width="65">Golds</th>
                        <th width="65">Diamonds</th>
                        <th width="70">status</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>C-35</td>
                            <td className="c-name"><div className="f-n-c"><img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/competitions/ats.jpg`} alt="" /><span>Free Fire Max</span></div></td>
                            <td>12-02-2022 12:55</td>
                            <td>45</td>
                            <td>100</td>
                            <td><div className="f-n-c"><img src="./../coin.png" alt="" width="12" /><span className="ml-1"> 30</span></div></td>
                            <td><div className="f-n-c"><img src="./../diamond.png" alt="" width="12" /><span className="ml-1"> 05</span></div></td>
                            <td><span className="g-level">Accepted</span></td>
                        </tr>
                        <tr>
                            <td>C-35</td>
                            <td className="c-name"><div className="f-n-c"><img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/competitions/ats.jpg`} alt="" /><span>Free Fire Max</span></div></td>
                            <td>12-02-2022 12:55</td>
                            <td>45</td>
                            <td>100</td>
                            <td><div className="f-n-c"><img src="./../coin.png" alt="" width="12" /><span className="ml-1"> 30</span></div></td>
                            <td><div className="f-n-c"><img src="./../diamond.png" alt="" width="12" /><span className="ml-1"> 05</span></div></td>
                            <td><span className="g-level">Accepted</span></td>
                        </tr>
                        <tr>
                            <td>C-35</td>
                            <td className="c-name"><div className="f-n-c"><img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/competitions/ats.jpg`} alt="" /><span>Free Fire Max</span></div></td>
                            <td>12-02-2022 12:55</td>
                            <td>45</td>
                            <td>100</td>
                            <td><div className="f-n-c"><img src="./../coin.png" alt="" width="12" /><span className="ml-1"> 30</span></div></td>
                            <td><div className="f-n-c"><img src="./../diamond.png" alt="" width="12" /><span className="ml-1"> 05</span></div></td>
                            <td><span className="g-level">Accepted</span></td>
                        </tr>
                        <tr>
                            <td>C-35</td>
                            <td className="c-name"><div className="f-n-c"><img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/competitions/ats.jpg`} alt="" /><span>Free Fire Max</span></div></td>
                            <td>12-02-2022 12:55</td>
                            <td>45</td>
                            <td>100</td>
                            <td><div className="f-n-c"><img src="./../coin.png" alt="" width="12" /><span className="ml-1"> 30</span></div></td>
                            <td><div className="f-n-c"><img src="./../diamond.png" alt="" width="12" /><span className="ml-1"> 05</span></div></td>
                            <td><span className="g-level">Accepted</span></td>
                        </tr>
                        <tr>
                            <td>C-35</td>
                            <td className="c-name"><div className="f-n-c"><img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/competitions/ats.jpg`} alt="" /><span>Free Fire Max</span></div></td>
                            <td>12-02-2022 12:55</td>
                            <td>45</td>
                            <td>100</td>
                            <td><div className="f-n-c"><img src="./../coin.png" alt="" width="12" /><span className="ml-1"> 30</span></div></td>
                            <td><div className="f-n-c"><img src="./../diamond.png" alt="" width="12" /><span className="ml-1"> 05</span></div></td>
                            <td><span className="g-level">Accepted</span></td>
                        </tr>
                        <tr>
                            <td>C-35</td>
                            <td className="c-name"><div className="f-n-c"><img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/competitions/ats.jpg`} alt="" /><span>Free Fire Max</span></div></td>
                            <td>12-02-2022 12:55</td>
                            <td>45</td>
                            <td>100</td>
                            <td><div className="f-n-c"><img src="./../coin.png" alt="" width="12" /><span className="ml-1"> 30</span></div></td>
                            <td><div className="f-n-c"><img src="./../diamond.png" alt="" width="12" /><span className="ml-1"> 05</span></div></td>
                            <td><span className="g-level">Accepted</span></td>
                        </tr>
                        <tr>
                            <td>C-35</td>
                            <td className="c-name"><div className="f-n-c"><img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/competitions/ats.jpg`} alt="" /><span>Free Fire Max</span></div></td>
                            <td>12-02-2022 12:55</td>
                            <td>45</td>
                            <td>100</td>
                            <td><div className="f-n-c"><img src="./../coin.png" alt="" width="12" /><span className="ml-1"> 30</span></div></td>
                            <td><div className="f-n-c"><img src="./../diamond.png" alt="" width="12" /><span className="ml-1"> 05</span></div></td>
                            <td><span className="g-level">Accepted</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
