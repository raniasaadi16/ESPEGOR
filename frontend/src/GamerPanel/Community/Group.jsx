import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import API from '../../Services/AuthIntercepteurs'

export const Group = (props) => {

    const [isAlreadyJoint, setIsAlreadyJoint] = useState(false);

    useEffect(() => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/check/group/${props.data.id}`).then(res => {
            if (res.data.length > 0){
                setIsAlreadyJoint(true);
            }
        });
    }, []);

    const JoinGroup = async () => {
       
        await API.post(`${process.env.REACT_APP_SERVER_END_POINT}/community/join/group`, {id : props.data.id}).then(res => {
            console.log(res);
        });
        window.location.reload();
    }

    
    return (
        <div className="c-card">
            <div className="top f-b-c">
                <h2>{props.data.name}</h2>
                {
                    !isAlreadyJoint ? 
                        <button className="join" onClick={JoinGroup}>Join</button> : 
                        <button className="see"><Link to={"/community/group/" + props.data.id}><FaEye /></Link></button>
                }
            </div>
            <div className="bottom f gap10">
                <div className="left">
                    <img src={props.data.icon} alt="" className='h-full' />
                </div>
                <div className="right">
                    <div className="data f-b-c">
                        <p className='title'>Owner</p>
                        <p className='value'>{props.data.name}</p>
                    </div>
                    <div className="data f-b-c">
                        <p className='title'>Members</p>
                        <p className='value'>{props.data.members}</p>
                    </div>
                    <div className="data f-b-c">
                        <p className='title'>Posts</p>
                        <p className='value'>{props.data.posts}</p>
                    </div>
                    <div className="data f-b-c">
                        <p className='title'>Created At</p>
                        <p className='value'>{props.data.created_at}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
