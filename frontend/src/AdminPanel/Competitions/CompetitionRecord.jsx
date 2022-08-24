import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


export const CompetitionRecord = (props) => {

    const DeleteCompetition = () => {
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/competition/delete/${props.data.id}`).then( res => {
            window.location.reload();
        });
    }

    const UpdateCompetition = () => {
        props.SetCompetition(props.data);
        document.getElementById("popup-form").style.display = 'block';
    }

    const status = props.data.competition_status;

    return (
        <tr>
            <td>C-{props.data.id}</td>
            <td className="c-name"><div className="f-n-c"><img src={props.data.icon} alt="" /><span>{props.data.name}</span></div></td>
            <td>{props.data.competition_date}</td>
            <td>{props.data.players}</td>
            <td>{props.data.max_players}</td>
            <td><div className="f-n-c"><img src="./../coin.png" alt="" width="12" /><span className="ml-1">{props.data.price_gold}</span></div></td>
            <td><div className="f-n-c"><img src="./../diamond.png" alt="" width="12" /><span className="ml-1">{props.data.price_diamond}</span></div></td>
            <td>
                <span className={"g-level " + (status === 0?"g-p":status===1?"g-i":"g-a")}>
                    {
                        status === 0 ? 'Pending' : status === 1 ? 'Rejected' : 'Accepted'
                    }
                </span>
            </td>
            <td className="actions f-n-c">
                <div className="f-c-c see">
                    <Link to={"/competition/"+props.data.id}><img src="./../eye.svg" alt="" width="14" /></Link>
                </div>
                <div className="f-c-c edit" onClick={UpdateCompetition}>
                    <Link to="#"><img src="./../edit.svg" alt="" width="14" /></Link>
                </div>
                <div className="f-c-c delete" onClick={DeleteCompetition}>
                    <Link to="#"><img src="./../delete.svg" alt="" width="14" /></Link>
                </div>
            </td>
        </tr>
    );
}
