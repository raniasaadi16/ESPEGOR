import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { IoMdSwitch } from 'react-icons/io'
import { BiTime } from 'react-icons/bi'
import API from '../../Services/AuthIntercepteurs'
import { useHistory, useParams } from 'react-router-dom'
import Interweave from 'interweave'
// import {Redirect} from 'react-router-dom'

export const GameDetail = () => {


    
    const [game, setGame] = useState({});
    const [competitions, setCompetitions] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/game/admin/${id}`).then(res => {
            const g = res.data.game;
            const competitionsList = res.data.competitions;
            setGame(g);
            competitionsList.forEach(element => {
                setCompetitions((list) => [...list, element]);
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
                    <div className="game-detail">
                        <div className="game-left">
                            <div className="img">
                                <img src={game.icon} alt="" width="250" />
                            </div>
                            <div className="info">
                                <div className="name f-b-c">
                                    <h3>{game.name}</h3>
                                    <span className="joining">{competitions.length}</span>
                                </div>
                                <div className="desc">
                                    <Interweave content={game.description} />
                                </div>
                                <div className="time f-n-c">
                                    <BiTime />
                                    <span>{game.created_at}</span>
                                </div>
                                <div className="status f-n-c">
                                    <IoMdSwitch />
                                    <span>{game.game_status === 0 ? 'Pending' : game.game_status === 1 ? 'Inactive' : 'Active'}</span>
                                </div>
                            </div>
                            
                        </div>
                        <div className="game-right">
                            {
                                competitions.map((item, i) => {
                                    return (
                                        <div className="comp f-n-c" key={i}>
                                            <img src={item.icon} alt="" width="18" />
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
