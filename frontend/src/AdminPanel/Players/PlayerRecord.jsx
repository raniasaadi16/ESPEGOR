import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'



export const PlayerRecord = (props) => {

    const DeletePlayer = function(){
        axios.get(`${process.env.REACT_APP_SERVER_END_POINT}/player/delete/${props.data.user_id}`).then( res => {
            window.location.reload();
        });
    }

    
    return (
        <tr>
            <td>P-{props.data.id}</td>
            <td className="c-name"><div className="f-n-c"><img src={`${process.env.REACT_APP_SERVER_END_POINT}/assets/profiles/${props.data.profile_image}`} alt={`name profile pic`} /><span>{props.data.name}</span></div></td>
            <td>{props.data.email}</td>
            <td>{props.data.joined_at}</td>
            <td><div className="f-n-c"><img src="./../coin.png" alt="" width="12" /><span className="ml-1">{props.data.golds}</span></div></td>
            <td><div className="f-n-c"><img src="./../diamond.png" alt="" width="12" /><span className="ml-1">{props.data.diamonds}</span></div></td>
            <td>{props.data.comps}</td>
            <td className="actions f-n-c">
                <div className="f-c-c see">
                    <Link to={"/player/"+props.data.id}><img src="./../eye.svg" alt="" width="14" /></Link>
                </div>
                <div className="f-c-c delete" onClick={DeletePlayer}>
                    <Link to="#"><img src="./../delete.svg" alt="" width="14" /></Link>
                </div>
            </td>
        </tr>
    );
}
