import React from 'react'
import {Link} from 'react-router-dom'
export const Transition = (props) => {

    const status = props.data.status;
    return (
        <div className="comp">
            <div className="ttop f-b-c">
                <div className="see f-c-c">
                    <Link target="_blank" to={{pathname: `${process.env.REACT_APP_SERVER_END_POINT}/assets/transitions/${props.data.photo}`}}><img src="./../eye.svg" alt="" width="14" /></Link>
                </div>
            </div>
            <div className="infos">
                <h3 className="f-n-c">
                    <span>{props.data.name}</span>
                </h3>
                <p>{props.data.created_at}</p>
                <div className="silk f gap10">
                    <p className="f-n-c"><img src="./../coin.png" alt="" width="16" /><span className="ml-1">{props.data.golds}</span></p>
                    <p className="f-n-c"><img src="./../diamond.png" alt="" width="16" /><span className="ml-1">{props.data.diamonds}</span></p>
                </div>
                
                <div className="status">{status === 0 ? 'Pending' : status === 1 ? 'Rejected' : 'Accepted'}</div>
            </div>
        </div>     
    );
}
