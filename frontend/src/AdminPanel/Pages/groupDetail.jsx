import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { MdPersonOutline } from 'react-icons/md'
import {useHistory, useParams} from 'react-router-dom'

import API from './../../Services/AuthIntercepteurs';
import Interweave from 'interweave'

export const GroupDetail = () => {

    const [players, setPlayers] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/group/posts/${id}`).then(res => {
            const playersList = res.data;
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
                <div className="page-content group">
                    <div className="group-detail gap10">
                        <div className="group-left">
                            <div className="background">
                                <div className="img">
                                    <img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/community/nigh.png`} alt="" width="250" />
                                </div>
                                <div className="info">
                                    <div className="name f-b-c">
                                        <h3>{'Name Of The Group Here'}</h3>
                                        <span className="joining">1545</span>
                                    </div>
                                    <div className="desc">
                                        <Interweave content={'testing'} />
                                    </div>
                                    <div className="owner f-b-c">
                                        <div className="left f-b-c">
                                            <MdPersonOutline />
                                            <span>Admin 54</span>
                                        </div>
                                        <div className="right">
                                            <span className="owner-badge">Group</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="group-middle">
                            <div className="background">
                            {
                                players.map((item, i) => {
                                    return (
                                        <div className="player f-n-c" key={i}>
                                            <img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/community/${item.path}`} alt="" width="300" />
                                            <span>{item.name}</span>
                                        </div>
                                    );
                                })
                            }
                            </div>
                        </div>
                        <div className="group-right">
                            <div className="background">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
