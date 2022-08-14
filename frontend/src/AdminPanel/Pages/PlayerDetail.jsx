import Interweave from 'interweave';
import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'
import { useHistory, useParams } from 'react-router-dom';
import API from '../../Services/AuthIntercepteurs';
// import {Redirect} from 'react-router-dom'

export const PlayerDetail = () => {



     
    const [player, setPlayer] = useState({});
    const [competitions, setCompetitions] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/player/admin/${id}`).then(res => {
            const p = res.data.player;
            const competitionsList = res.data.competitions;
            setPlayer(p);
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
                    <div className="player-detail">
                        <div className="player-left">
                            <div className="img">
                                <img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/profiles/${player.profile_image}`} alt="" />
                            </div>
                            <div className="info">
                                <div className="name f-b-c">
                                    <h3>{player.name}</h3>
                                    <span className="joining">{competitions.length}</span>
                                </div>

                                <div className="email f-n-c">
                                    <MdAlternateEmail />
                                    <span>{player.email}</span>
                                </div>

                                <div className="desc">
                                    <Interweave content={player.bio} />
                                </div>

                                <div className="tokens f-n-c">
                                    <div className="coin f-n-c">
                                        <img src="./../coin.png" alt="" width="16" />
                                        <span>{player.golds}</span>
                                    </div>
                                    <div className="diamond f-n-c">
                                        <img src="./../diamond.png" alt="" width="16" />
                                        <span>{player.diamonds}</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="player-right">
                            {
                                competitions.map((item, i) => {
                                    return  (
                                        <div className="comp f-n-c" key={i}>
                                            <img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/competitions/${item.icon}`} alt="" width="18" />
                                            <span>{item.name}</span>
                                        </div>
                                    );
                                })
                            }
                            
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}
