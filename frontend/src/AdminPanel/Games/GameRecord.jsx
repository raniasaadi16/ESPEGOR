import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


export const GameRecord = (props) => {

    const DeleteGame = () => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/game/delete/${props.data.id}`).then( res => {
            window.location.reload();
        });
    }

    const UpdateGame = () => {
        props.SetGame(props.data);
        document.getElementById("popup-form").style.display = 'block';
    }

    const status = props.data.game_status;
    
    return (
        <tr>
            <td>U-{props.data.id}</td>
            <td className="c-name"><div className="f-n-c"><img src={props.data.icon} alt="" /><span>{props.data.name}</span></div></td>
            <td>{props.data.comps}</td>
            <td>
                <span className={"g-level " + (status === 0?"g-p":status===1?"g-i":"g-a")}>
                    {
                        status === 0 ? 'Pending' : status === 1 ? 'Inactive' : 'Active'
                    }
                </span>
            </td>
            <td>{props.data.created_at}</td>
            <td className="actions f-n-c">
                <div className="f-c-c see">
                    <Link to={"/game/"+props.data.id}><img src="./../eye.svg" alt="" width="14" /></Link>
                </div>
                <div className="f-c-c edit" onClick={UpdateGame}>
                    <Link to="#"><img src="./../edit.svg" alt="" width="14" /></Link>
                </div>
                <div className="f-c-c delete" onClick={DeleteGame}>
                    <Link to="#"><img src="./../delete.svg" alt="" width="14" /></Link>
                </div>
            </td>
        </tr>
    );
}
