import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { MdPersonOutline } from 'react-icons/md'
import { BiMapPin, BiTime } from 'react-icons/bi'
import { IoGameControllerOutline } from 'react-icons/io5'
import {useHistory, useParams} from 'react-router-dom'

import API from './../../Services/AuthIntercepteurs';
import Interweave from 'interweave'

export const CompetitionDetail = () => {

    const [comp, setComp] = useState({});
    const [players, setPlayers] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/competition/admin/${id}`).then(res => {
            const competition = res.data.competition;
            const playersList = res.data.players;
            setComp(competition);
            playersList.forEach(element => {
                setPlayers((list) => [...list, element]);
            });
        });
    }, []);


    let history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    
    
    return (
        <div id="detail-page" className="f-c-c">
            <div className="f-n-s">
                <div className="redirect f-c-c" onClick={goBack}>
                    <FaChevronLeft />
                </div>
                <div className="page-content">
                    <div className="competition-detail">
                        <div className="competition-left">
                            <div className="img">
                                <img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/competitions/${comp.icon}`} alt="" width="250" />
                            </div>
                            <div className="info">
                                <div className="name f-b-c">
                                    <h3>{comp.name}</h3>
                                    <span className="joining">{comp.max_players}/{players.length}</span>
                                </div>
                                <div className="desc">
                                    <Interweave content={comp.description} />
                                </div>
                                <div className="owner f-b-c">
                                    <div className="left f-b-c">
                                        <MdPersonOutline />
                                        <span>Owner Name</span>
                                    </div>
                                    <div className="right">
                                        <span className="owner-badge">Badge</span>
                                    </div>
                                </div>
                                <div className="map f-n-c">
                                    <BiMapPin />
                                    <span>{comp.location}</span>
                                </div>
                                <div className="game f-n-c">
                                    <IoGameControllerOutline />
                                    <span>{comp.game_name}</span>
                                </div>
                                <div className="time f-n-c">
                                    <BiTime />
                                    <span>{comp.competition_date}</span>
                                </div>
                                <div className="price f-n-c">
                                    <div className="coin f-n-c">
                                        <img src="./../coin.png" alt="" width="16" />
                                        <span>{comp.price_gold}</span>
                                    </div>
                                    <div className="diamond f-n-c">
                                        <img src="./../diamond.png" alt="" width="16" />
                                        <span>{comp.price_diamond}</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="competition-right">
                            {
                                players.map((item, i) => {
                                    return (
                                    <div className="player f-n-c" key={i}>
                                        <img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/profiles/${item.profile_image}`} alt="" width="18" />
                                        <span>{item.name}</span>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
