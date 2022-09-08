import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Interweave from 'interweave'

import axios from 'axios'; 
import API from "../../Services/AuthIntercepteurs";

function Info(props) {

    let history = useHistory();

    const { id } = useParams();

    const [comp, setComp] = useState({});

    const [isJoined, setIsJoined] = useState(false);

    const [authPlayerId, setAuthPlayerId] = useState(0);

    useEffect( async () => {


        await API.get(`${process.env.REACT_APP_SERVER_END_POINT}/player/auth`).then(res => {
            const id = res.data.id;
            setAuthPlayerId(id);
        });

        console.log('22222');

        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/player/check/${authPlayerId}/${id}`).then(res => {
            if (res.data.length > 0){
                setIsJoined(true);
            }
        });

        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/competition/${id}`).then((res) => {
            setComp({
                competition_date: res.data.competition_date,
                description: res.data.description,
                game_name: res.data.game_name,
                icon: res.data.icon,
                location: res.data.location,
                max_players: res.data.max_players,
                name: res.data.name,
                organizer_id: res.data.organizer_id,
                price_diamond: res.data.price_diamond,
                price_gold: res.data.price_gold,
                player_joined: res.data.player_joined
            });
            console.log(res.data)
            axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/organizer/${res.data.organizer_id}`).then((respond)=>{
                const oname = respond.data.name;
                setComp(pcomp => ({...pcomp, organizer_name: oname }));
            });
        });

    }, [authPlayerId]);


    const Join = () => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/player/join/${authPlayerId}/${id}`).then(res => {
            if (res.data.join === true){
                history.push('/join/' + id);
            } else {
                alert(res.data.message);
            }
        });
    }

    return (
        <div className="champ">
            <div className="container">
                <div className="wrapper f">
                    <div className="img">
                        <img src={comp.icon} alt="" width="400" />
                    </div>
                    <div className="infos">
                        <h2>{comp.name}</h2>
                        <p className="label">Organizer : <span className="ml-1"> {comp.organizer_name} <img src="./../organizer-icon.svg" alt="" width="12" /> </span></p>
                        <p className="label">Location : <span>{comp.location} <img src="./../location.svg" alt="" width="12" /> </span></p>
                        <p className="label">Game: <span className="ml-1"> {comp.game_name} <img src="./../joystick.svg" alt="" width="12" /> </span></p>
                        <p className="label">Date : <span className="ml-1"> {comp.competition_date}  <img src="./../calendar.svg" alt="" width="12" /> </span></p>
                        <p className="label">Gold required : <span className="ml-1"> {comp.price_gold} <img src="./../coin.png" alt="" width="12" /> </span></p>
                        <p className="label">Diamonds required: <span className="ml-1"> {comp.price_diamond} <img src="./../diamond.png" alt="" width="12" /> </span></p>
                        <p className="label">Players Joined : <span>{comp.player_joined} <img src="./../gamer-icon.svg" alt="" width="12" /> </span></p>
                        <p className="label">Players Required : <span className="ml-1"> {comp.max_players} <img src="./../gamer-icon.svg" alt="" width="12" /> </span></p>
                        <div className="desc">
                            <p className="label">Description : </p>
                            <div className="cont">
                                <Interweave content={comp.description} />
                            </div>
                        </div>

                        {!isJoined ? 
                            <button onClick={e =>
                                window.confirm("Are you sure you wanna join this competition because once you join you can't take your money back") && Join(e)
                            }>
                            Join
                            </button> : <p style={{textAlign: 'center', color: 'grey', padding:'20px', fontSize: '12px'}}>You Already Joined</p>
                        }

                        <p style={{color: 'red', fontSize: '10px', marginTop: '10px', background: 'white', padding: '10px', borderRadius: '5px'}}>
                            <b>Once you join you can't take your tokens back <br />
                            so please make sure that you want to join before you submit your request</b>
                        </p>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
export default Info;
