import React from 'react'
import { FcParallelTasks } from 'react-icons/fc'


export const GameCard = (props) => {
    const status = props.data.game_status;
    return (
        <div className="game">
            <div className="top">
                <img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/games/${props.data.icon}`} alt="" />
            </div>
            <div className="bottom">
                <h4>{props.data.name}</h4>
                <div className="f-b-c">
                    <div className="f-n-c"><FcParallelTasks /><p>14 Competitions</p></div>
                    <span>Active</span>
                </div>
            </div>
        </div>
    );
}
