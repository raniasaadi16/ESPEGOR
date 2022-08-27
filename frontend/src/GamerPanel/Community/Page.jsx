import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import API from '../../Services/AuthIntercepteurs'

export const Page = (props) => {
    const [isAlreadyFollowed, setIsAlreadyFollowed] = useState(false);

    useEffect(() => {
        API.get(`${process.env.REACT_APP_SERVER_END_POINT}/community/check/page/${props.data.id}`).then(res => {
            if (res.data.length > 0){
                setIsAlreadyFollowed(true);
            }
        });
    }, []);

    const FollowPage = async () => {
    
        await API.post(`${process.env.REACT_APP_SERVER_END_POINT}/community/follow/page`, {id: props.data.id}).then(res => {
        });
        window.location.reload();
    }

    return (
        <div className="c-card">
            <div className="top f-b-c">
                <h2>{props.data.name}</h2>
                {
                    !isAlreadyFollowed ?
                        <button className="join" onClick={FollowPage}>Follow</button> : 
                        <button className="see"><Link to={"/community/page/" + props.data.id}><FaEye /></Link></button>
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
                        <p className='title'>Followers</p>
                        <p className='value'>{props.data.followers}</p>
                    </div>
                    <div className="data f-b-c">
                        <p className='title'>Posts</p>
                        <p className='value'>{props.data.posts}</p>
                    </div>
                    <div className="data f-b-c">
                        <p className='title'>Total Like</p>
                        <p className='value'>{props.data.total_likes}</p>
                    </div>
                    <div className="data f-b-c">
                        <p className='title'>Total Dislike</p>
                        <p className='value'>{props.data.total_dislikes}</p>
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
